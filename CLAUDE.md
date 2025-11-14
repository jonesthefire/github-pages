# CLAUDE.md - AI Assistant Guide

## Repository Overview

This is a **GitHub Skills Tutorial Repository** designed to teach users how to create static websites and blogs using GitHub Pages and Jekyll. It's part of the official GitHub Skills learning platform and serves as an interactive, automated tutorial experience.

**Project Type:** Educational template repository with GitHub Actions-driven automated learning workflows

**Technology Stack:**
- Jekyll (static site generator)
- GitHub Pages (hosting)
- GitHub Actions (workflow automation)
- Markdown (content format)

**Target Audience:** Beginners, students, project maintainers, and small businesses learning GitHub Pages

**License:** MIT License (Copyright GitHub, Inc.)

---

## Directory Structure

```
/home/user/github-pages/
├── .github/
│   ├── workflows/              # Automated workflow files (6 YAML files)
│   │   ├── 0-welcome.yml       # Initial setup: creates my-pages branch
│   │   ├── 1-enable-github-pages.yml
│   │   ├── 2-configure-your-site.yml
│   │   ├── 3-customize-your-homepage.yml
│   │   ├── 4-create-a-blog-post.yml
│   │   └── 5-merge-your-pull-request.yml
│   ├── steps/                  # Tutorial content (7 markdown files)
│   │   ├── -step.txt          # Current step tracker (single digit)
│   │   ├── 0-welcome.md       # Step 0 content
│   │   ├── 1-enable-github-pages.md
│   │   ├── 2-configure-your-site.md
│   │   ├── 3-customize-your-homepage.md
│   │   ├── 4-create-a-blog-post.md
│   │   ├── 5-merge-your-pull-request.md
│   │   └── X-finish.md        # Completion page
│   └── dependabot.yml         # Monthly GitHub Actions updates
├── .gitignore                 # Standard ignore patterns
├── LICENSE                    # MIT License
└── README.md                  # Main course introduction
```

---

## Workflow Architecture

### How the Tutorial System Works

1. **Step Tracking:** `.github/steps/-step.txt` contains a single digit (0-5 or X) representing the current step
2. **Workflow Triggers:** Each workflow is triggered by specific events (push, page_build, workflow_dispatch)
3. **Conditional Execution:** Workflows only run when:
   - The repository is NOT a template repository
   - The current step matches the workflow's expected step number
4. **Automatic Progression:** Uses `skills/action-update-step@v2` to advance to the next step

### Workflow Pattern (Common Structure)

All workflows follow this pattern:

```yaml
name: Step N, [Description]

on:
  [trigger-event]  # e.g., push, page_build

permissions:
  contents: write        # Update step metadata
  pull-requests: write   # Create/manage PRs

jobs:
  get_current_step:
    # Reads .github/steps/-step.txt
    # Outputs: current_step

  on_[action]:
    needs: get_current_step
    if: >-
      ${{ !github.event.repository.is_template
          && needs.get_current_step.outputs.current_step == N }}
    steps:
      # Perform workflow actions
      - name: Update to step N+1
        uses: skills/action-update-step@v2
```

### Workflow Breakdown

| Step | Workflow File | Trigger Event | Action Performed | Next Step |
|------|---------------|---------------|------------------|-----------|
| 0 | `0-welcome.yml` | Push to main | Creates `my-pages` branch, adds `_config.yml` and `index.md` | 1 |
| 1 | `1-enable-github-pages.yml` | `page_build` event | Detects GitHub Pages activation | 2 |
| 2 | `2-configure-your-site.yml` | Push to `_config.yml` | Detects Jekyll theme configuration | 3 |
| 3 | `3-customize-your-homepage.yml` | Push to `index.md` | Detects homepage customization | 4 |
| 4 | `4-create-a-blog-post.yml` | Push to `_posts/*.md` | Detects blog post creation | 5 |
| 5 | `5-merge-your-pull-request.yml` | Push to main | Detects PR merge | X |
| X | None | N/A | Course complete | N/A |

### Git Configuration in Workflows

Workflows use the GitHub Actions bot for commits:
```bash
git config user.name github-actions[bot]
git config user.email github-actions[bot]@users.noreply.github.com
```

**Location:** `.github/workflows/0-welcome.yml:77-78`

---

## Tutorial Flow & Learning Progression

### Step 0: Welcome
- **File:** `.github/steps/0-welcome.md` (placeholder), content in `README.md`
- **User Action:** Create repository from template
- **System Action:** Workflow creates `my-pages` branch with initial files
- **Duration:** ~20 seconds

### Step 1: Enable GitHub Pages
- **File:** `.github/steps/1-enable-github-pages.md`
- **User Action:** Navigate to Settings > Pages, enable GitHub Pages from main branch
- **System Action:** Detects `page_build` event, advances to step 2
- **Duration:** ~1 minute (slower due to deployment wait)

### Step 2: Configure Your Site
- **File:** `.github/steps/2-configure-your-site.md`
- **User Action:** Add `theme: minima` to `_config.yml` in `my-pages` branch
- **System Action:** Detects push to `_config.yml`, advances to step 3
- **Duration:** ~20 seconds

### Step 3: Customize Your Homepage
- **File:** `.github/steps/3-customize-your-homepage.md`
- **User Action:** Edit `index.md` with custom content and frontmatter
- **System Action:** Detects push to `index.md`, advances to step 4
- **Duration:** ~20 seconds

### Step 4: Create a Blog Post
- **File:** `.github/steps/4-create-a-blog-post.md`
- **User Action:** Create `_posts/YYYY-MM-DD-title.md` with Jekyll frontmatter
- **Expected Format:**
  ```markdown
  ---
  title: "Post Title"
  date: YYYY-MM-DD
  ---

  Post content here
  ```
- **System Action:** Detects push to `_posts/*.md`, advances to step 5
- **Duration:** ~20 seconds

### Step 5: Merge Your Pull Request
- **File:** `.github/steps/5-merge-your-pull-request.md`
- **User Action:** Merge `my-pages` branch into `main`
- **System Action:** Detects merge, advances to step X (finish)
- **Duration:** ~20 seconds

### Step X: Finish
- **File:** `.github/steps/X-finish.md`
- **Content:** Congratulations message, recap, and next steps
- **Celebration Image:** `https://octodex.github.com/images/constructocat2.jpg`

---

## Key Conventions & Best Practices

### File Naming Conventions

1. **Step Files:** `N-description.md` where N is step number (0-5, or X for finish)
2. **Workflow Files:** Match step file naming: `N-description.yml`
3. **Jekyll Blog Posts:** `YYYY-MM-DD-title.md` in `_posts/` directory
4. **Step Tracker:** Always a single file named `-step.txt` containing one character

### Markdown Structure

**Tutorial Step Files:**
```markdown
<!--
  <<< Author notes: Step N >>>
  [Instructions for course authors]
-->

## Step N: [Title]

_[Engaging introduction with emoji]_

[Explanation paragraph with links to GitHub docs]

### :keyboard: Activity: [Action Name]

1. [Numbered instructions]
2. [With specific UI navigation]
3. [Clear action steps]
```

**Frontmatter for Jekyll:**
```yaml
---
title: "Page Title"
date: YYYY-MM-DD
---
```

### GitHub Actions Patterns

1. **Always check step number** before executing workflow actions
2. **Use `fetch-depth: 0`** when needing all branches (`.github/workflows/0-welcome.yml:57`)
3. **Set permissions explicitly** at workflow level
4. **Use conditional execution** with `if:` to prevent template repository execution
5. **Wait times:** Most steps ~20 seconds, step 1 takes ~1 minute

### Branch Strategy

- **`main`** - Default branch, contains README and step content
- **`my-pages`** - Created by workflow, contains Jekyll files for learner editing
- **Merge direction:** `my-pages` → `main` (completed in Step 5)

---

## Development Guidelines for AI Assistants

### When Modifying This Repository

#### DO:
- **Preserve the step progression system** - Don't break the workflow chain
- **Maintain consistent file naming** - Follow `N-description.{yml,md}` pattern
- **Update `-step.txt`** if adding/removing steps
- **Test workflow triggers** - Ensure events still fire correctly
- **Keep step durations in mind** - Mention wait times in instructions
- **Use GitHub docs links** - Reference `docs.github.com` for explanations
- **Maintain accessibility** - Clear, beginner-friendly language
- **Follow MIT license** - This is open source GitHub content

#### DON'T:
- **Don't hardcode repository names** - Use context variables like `${{ github.repository }}`
- **Don't skip step validation** - Always check current step before workflow actions
- **Don't create circular dependencies** - Keep workflow progression linear
- **Don't remove the template check** - Keep `!github.event.repository.is_template` condition
- **Don't modify LICENSE** - This is GitHub's official tutorial content
- **Don't add unnecessary dependencies** - Keep it simple for beginners

### Common Modification Scenarios

#### Adding a New Step

1. Create new step file: `.github/steps/N-new-step.md`
2. Create corresponding workflow: `.github/workflows/N-new-step.yml`
3. Update previous step's workflow to advance to new step number
4. Update new step's workflow to advance to next step number
5. Test the entire workflow chain

#### Modifying Step Content

1. Edit step file in `.github/steps/`
2. Ensure activity instructions match workflow expectations
3. Verify trigger events still align with user actions
4. Update wait time estimates if needed

#### Debugging Workflows

1. Check `.github/steps/-step.txt` for current step
2. Verify workflow conditions match current step
3. Check GitHub Actions tab for workflow runs
4. Confirm triggers are firing (push events, page_build, etc.)
5. Review workflow logs for job execution details

### Important Files Reference

| File | Purpose | Modify With Caution |
|------|---------|---------------------|
| `.github/steps/-step.txt` | Step tracker | ⚠️ Only update via workflows |
| `.github/workflows/*.yml` | Automation logic | ⚠️ Test thoroughly after changes |
| `README.md` | Primary user-facing content | ✅ Safe to improve |
| `.github/steps/*.md` | Step instructions | ✅ Safe to improve |
| `LICENSE` | Legal terms | ❌ Do not modify |
| `.github/dependabot.yml` | Dependency updates | ✅ Safe to configure |

---

## Technical Details

### Dependencies

**GitHub Actions:**
- `actions/checkout@v4` - Repository checkout
- `skills/action-update-step@v2` - Step progression automation

**Jekyll (User-side, not in repo):**
- `theme: minima` - Default Jekyll theme recommended

### Dependabot Configuration

- **Ecosystem:** `github-actions`
- **Update frequency:** Monthly
- **Purpose:** Keep workflow actions up-to-date
- **Location:** `.github/dependabot.yml:1-7`

### Permissions Model

**Required permissions for workflows:**
- `contents: write` - Update README and step metadata
- `pull-requests: write` - Create pull requests programmatically

**User requirements:**
- Repository admin access (to enable GitHub Pages)
- Git basics knowledge (branching, commits, PRs)

---

## Educational Philosophy

This repository demonstrates:

1. **Learning by doing** - Hands-on Git and GitHub Pages experience
2. **Immediate feedback** - Automated workflows provide instant validation
3. **Progressive complexity** - Steps build on previous knowledge
4. **Real-world workflows** - Uses actual Git branching and PR patterns
5. **Documentation first** - Links to official GitHub docs throughout

### Teaching Techniques Used

- **Emoji for engagement** - :tada:, :keyboard: for visual interest
- **Clear action items** - "Activity" sections with numbered steps
- **Contextual timing** - Setting expectations for workflow delays
- **Encouragement** - Welcoming tone, celebration upon completion
- **External resources** - Links to deeper documentation

---

## Troubleshooting Guide

### Common Issues

**Workflow not advancing:**
- Check `.github/steps/-step.txt` value matches expected step
- Verify trigger event occurred (check GitHub Actions tab)
- Confirm repository is not a template repository
- Wait full duration (20 seconds or 1 minute for step 1)

**Step number mismatch:**
- Workflows read from `-step.txt` - this is the source of truth
- Manual override: Edit `-step.txt` and push to main (advanced users only)

**GitHub Pages not building:**
- Confirm Pages is enabled in Settings > Pages
- Check Pages build status in repository Settings
- Verify source branch is set correctly (should be `main`)

---

## Quick Reference

### Current State
- **Step:** 0 (as of `.github/steps/-step.txt`)
- **Active Branch:** `main`
- **Tutorial State:** Ready for initial fork/template use

### Key Commands for Development

```bash
# Check current step
cat .github/steps/-step.txt

# View workflow runs
gh run list  # (requires gh CLI)

# Test workflow locally (requires act)
act -l

# View git branches
git branch -a
```

### Important Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Jekyll Documentation](https://jekyllrb.com)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Skills Discussion Board](https://github.com/orgs/skills/discussions/categories/github-pages)

---

## Summary for AI Assistants

This is an **educational automation repository** where:

1. **Content lives in `.github/steps/`** - These are the tutorial instructions
2. **Automation lives in `.github/workflows/`** - These detect user progress
3. **State lives in `.github/steps/-step.txt`** - Single source of truth
4. **User works in `my-pages` branch** - Created by first workflow
5. **Main branch updates automatically** - Via `skills/action-update-step` action

**Primary goal:** Teach GitHub Pages through automated, interactive learning experiences.

**When helping users:** Preserve the learning journey. Don't skip steps or break the automated progression system. This repository is designed to teach through experience, not just provide answers.

---

**Last Updated:** 2025-11-14
**Repository State:** Step 0 (Welcome)
**Claude Analysis Version:** 1.0
