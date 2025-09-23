// Data and generation logic

const EXAMPLES = [
  "roast chicken",
  "vegan curry",
  "spaghetti bolognese",
  "grilled salmon",
  "air-fryer chips",
  "full english breakfast",
  "stir-fry tofu",
];

const RECIPE_DB = [
  {
    key: ["roast chicken", "chicken roast", "whole chicken"],
    title: "Roast Chicken",
    baseServings: 4,
    ingredients: [
      { item: "whole chicken", qty: 1, unit: "x", grams: 1400 },
      { item: "olive oil", qty: 2, unit: "tbsp" },
      { item: "salt", qty: 2, unit: "tsp" },
      { item: "black pepper", qty: 1, unit: "tsp" },
      { item: "lemon", qty: 1, unit: "x" },
      { item: "garlic cloves", qty: 4, unit: "x" },
      { item: "fresh thyme (optional)", qty: 6, unit: "sprigs" },
      { item: "carrots", qty: 3, unit: "x" },
      { item: "onions", qty: 2, unit: "x" },
      { item: "potatoes", qty: 600, unit: "g" },
    ],
    methods: {
      gas: [
        "Heat oven to 200°C (gas mark 6).",
        "Pat chicken dry, rub with oil, salt and pepper; stuff cavity with lemon, garlic and thyme.",
        "Place on a roasting tray with chopped onions, carrots and potatoes.",
        "Roast 20 minutes, then reduce to 180°C (gas mark 4) and cook 45–60 minutes more until juices run clear (75°C in the thickest part).",
        "Rest 10–15 minutes before carving.",
      ],
      electric: [
        "Preheat oven to 200°C fan (220°C conventional).",
        "Prepare chicken as above.",
        "Roast 15 minutes, then reduce to 180°C fan (200°C conventional) and cook 50–60 minutes, basting once.",
        "Rest 10–15 minutes before carving.",
      ],
      air_fryer: [
        "Preheat air fryer to 180°C for 5 minutes.",
        "Rub chicken with oil, salt and pepper. If too large, use spatchcocked chicken.",
        "Cook breast-side down 30 minutes, flip and cook 20–25 minutes more until 75°C internal.",
        "Rest 10 minutes before carving.",
      ],
    },
  },
  {
    key: ["spaghetti bolognese", "bolognese", "ragu"],
    title: "Spaghetti Bolognese",
    baseServings: 4,
    ingredients: [
      { item: "spaghetti", qty: 350, unit: "g" },
      { item: "minced beef", qty: 400, unit: "g" },
      { item: "onion", qty: 1, unit: "x" },
      { item: "carrot", qty: 1, unit: "x" },
      { item: "celery stick", qty: 1, unit: "x" },
      { item: "garlic cloves", qty: 2, unit: "x" },
      { item: "tomato puree", qty: 1, unit: "tbsp" },
      { item: "tinned tomatoes", qty: 400, unit: "g" },
      { item: "beef stock", qty: 200, unit: "ml" },
      { item: "olive oil", qty: 2, unit: "tbsp" },
      { item: "oregano/basil", qty: 1, unit: "tsp" },
      { item: "salt & pepper", qty: 1, unit: "to taste" },
    ],
    methods: {
      gas: [
        "Heat oil in a saucepan over medium gas flame.",
        "Soften finely chopped onion, carrot and celery 5–7 minutes; add minced beef and brown.",
        "Stir in garlic and tomato puree 1 minute.",
        "Add tomatoes and stock, herbs, then simmer gently 30–40 minutes.",
        "Cook spaghetti in salted boiling water, drain and serve with the sauce.",
      ],
      electric: [
        "Use medium heat on electric hob; follow steps as above.",
        "Simmer on low 30–40 minutes with lid ajar.",
      ],
      air_fryer: [
        "Air fryer is not ideal for sauces. Use hob for sauce; optionally cook meatballs in air fryer at 190°C for 10–12 minutes and add to sauce.",
      ],
    },
  },
  {
    key: ["vegan curry", "chickpea curry", "vegetable curry"],
    title: "Chickpea & Spinach Vegan Curry",
    baseServings: 4,
    ingredients: [
      { item: "onion", qty: 1, unit: "x" },
      { item: "garlic cloves", qty: 3, unit: "x" },
      { item: "ginger", qty: 20, unit: "g" },
      { item: "curry powder", qty: 2, unit: "tbsp" },
      { item: "chopped tomatoes", qty: 400, unit: "g" },
      { item: "coconut milk", qty: 400, unit: "ml" },
      { item: "chickpeas (drained)", qty: 400, unit: "g" },
      { item: "spinach", qty: 150, unit: "g" },
      { item: "oil", qty: 1, unit: "tbsp" },
      { item: "salt & pepper", qty: 1, unit: "to taste" },
      { item: "rice", qty: 300, unit: "g" },
    ],
    methods: {
      gas: [
        "Heat oil; soften onion 5 minutes. Add garlic and ginger 1 minute.",
        "Stir in curry powder until fragrant, then tomatoes, coconut milk and chickpeas.",
        "Simmer 15 minutes; add spinach to wilt. Season.",
        "Cook rice in a separate pan and serve.",
      ],
      electric: [
        "Medium heat on electric hob; follow gas steps. Keep a gentle simmer to avoid splitting the coconut milk.",
      ],
      air_fryer: [
        "Air fryer not ideal for sauces; use hob for curry. You can crisp chickpeas 10 minutes at 190°C and stir through before serving.",
      ],
    },
  },
  {
    key: ["grilled salmon", "salmon fillet", "baked salmon"],
    title: "Grilled/Baked Salmon with Lemon",
    baseServings: 4,
    ingredients: [
      { item: "salmon fillets", qty: 4, unit: "x", grams: 600 },
      { item: "lemon", qty: 1, unit: "x" },
      { item: "olive oil", qty: 1, unit: "tbsp" },
      { item: "salt & pepper", qty: 1, unit: "to taste" },
      { item: "dill (optional)", qty: 1, unit: "tsp" },
      { item: "new potatoes", qty: 600, unit: "g" },
      { item: "green beans", qty: 300, unit: "g" },
    ],
    methods: {
      gas: [
        "Preheat grill to high (or oven 200°C).",
        "Season salmon with oil, salt and pepper; grill 3–4 minutes per side until just opaque.",
        "Steam beans and boil potatoes until tender.",
        "Finish with lemon juice and dill.",
      ],
      electric: [
        "Bake at 200°C for 10–12 minutes depending on thickness.",
      ],
      air_fryer: [
        "Air fry at 180°C for 8–10 minutes, skin side down.",
      ],
    },
  },
  {
    key: ["air-fryer chips", "chips", "fries"],
    title: "Air-Fryer Chips",
    baseServings: 4,
    ingredients: [
      { item: "potatoes", qty: 800, unit: "g" },
      { item: "oil", qty: 1, unit: "tbsp" },
      { item: "salt", qty: 1, unit: "to taste" },
    ],
    methods: {
      gas: [
        "Cut potatoes into chips and parboil 5 minutes; drain and steam-dry.",
        "Toss with oil and bake at 220°C (gas 7) for 30–35 minutes, turning once.",
      ],
      electric: [
        "As above at 220°C conventional or 200°C fan for 25–30 minutes.",
      ],
      air_fryer: [
        "Preheat to 200°C. Toss chips with oil and cook 18–22 minutes, shaking twice.",
      ],
    },
  },
];

function normalise(text) {
  return String(text || "").toLowerCase().trim();
}

function findRecipeByQuery(query) {
  const q = normalise(query);
  let best = null;
  for (const recipe of RECIPE_DB) {
    if (recipe.key.some(k => normalise(k) === q)) return recipe;
    if (recipe.key.some(k => normalise(k).includes(q) || q.includes(normalise(k)))) {
      best = recipe;
    }
  }
  return best;
}

function scaleIngredients(ingredients, baseServings, targetServings) {
  const factor = Math.max(1, Number(targetServings || baseServings)) / baseServings;
  return ingredients.map(i => {
    const qty = typeof i.qty === "number" ? roundNicely(i.qty * factor) : i.qty;
    return { ...i, qty };
  });
}

function roundNicely(n) {
  if (n < 1) return Math.round(n * 10) / 10; // tenths
  if (n < 10) return Math.round(n * 10) / 10;
  return Math.round(n);
}

function buildAllMethods(recipe, servings) {
  return [
    { key: "gas", label: "Gas" },
    { key: "electric", label: "Electricity" },
    { key: "air_fryer", label: "Air fryer" },
  ].filter(m => recipe.methods[m.key]).map(m => ({
    ...m,
    steps: recipe.methods[m.key],
    ingredients: scaleIngredients(recipe.ingredients, recipe.baseServings, servings),
  }));
}

function generateFromQuery(query, preferredMethod, servings) {
  const recipe = findRecipeByQuery(query) || synthesizeRecipe(query);
  const methods = buildAllMethods(recipe, servings);
  const method = methods.find(m => m.key === preferredMethod) || methods[0];
  return { recipe, method, methods, servings: Number(servings || recipe.baseServings) };
}

// Fallback generator if we don't have a direct match
function synthesizeRecipe(query) {
  const q = normalise(query);
  const base = {
    title: capitaliseWords(q || "Custom Meal"),
    baseServings: 4,
    ingredients: [
      { item: "onion", qty: 1, unit: "x" },
      { item: "garlic cloves", qty: 2, unit: "x" },
      { item: "oil", qty: 1, unit: "tbsp" },
      { item: "salt & pepper", qty: 1, unit: "to taste" },
    ],
    methods: {
      gas: [
        "Prepare your ingredients (chop onion/garlic, main item in bite-size).",
        "Heat a pan with oil over medium gas flame; sauté aromatics until fragrant.",
        "Add your main item and cook through.",
        "Season and finish with herbs, citrus or butter to taste.",
      ],
      electric: [
        "Use medium heat on electric hob; follow the gas instructions, adjusting to maintain a gentle sizzle.",
      ],
      air_fryer: [
        "Preheat air fryer to 190°C; toss main item with 1 tsp oil and seasoning; cook 10–15 minutes, shaking once.",
      ],
    },
  };
  // Heuristic additions
  if (q.includes("curry")) {
    base.title = capitaliseWords(q);
    base.ingredients.push(
      { item: "curry powder", qty: 1, unit: "tbsp" },
      { item: "coconut milk", qty: 400, unit: "ml" },
      { item: "chopped tomatoes", qty: 400, unit: "g" }
    );
    base.methods.gas = [
      "Soften onion in oil 5 minutes; add garlic 1 minute.",
      "Stir in curry powder until fragrant.",
      "Add tomatoes and coconut milk; simmer 15 minutes.",
      "Add vegetables or protein and cook through. Season.",
    ];
  }
  if (q.includes("pasta") || q.includes("spaghetti")) {
    base.ingredients.push({ item: "pasta", qty: 350, unit: "g" });
    base.methods.gas.push("Boil pasta in salted water until al dente and combine.");
  }
  return base;
}

function capitaliseWords(s) {
  return s.replace(/\b\w/g, c => c.toUpperCase());
}

// UI wiring

const els = {
  form: document.getElementById("recipe-form"),
  mealInput: document.getElementById("meal-input"),
  servingsInput: document.getElementById("servings-input"),
  showAllBtn: document.getElementById("show-all-methods"),
  copyBtn: document.getElementById("btn-copy"),
  printBtn: document.getElementById("btn-print"),
  results: document.getElementById("results"),
  recipeTitle: document.getElementById("recipe-title"),
  servingsLabel: document.getElementById("servings-label"),
  methodLabel: document.getElementById("method-label"),
  methodTabs: document.getElementById("method-tabs"),
  ingredientsList: document.getElementById("ingredients-list"),
  stepsList: document.getElementById("steps-list"),
  exampleChips: document.getElementById("example-chips"),
};

document.getElementById("year").textContent = String(new Date().getFullYear());

// Example chips
EXAMPLES.forEach(example => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = example;
  btn.addEventListener("click", () => {
    els.mealInput.value = example;
    els.form.requestSubmit();
  });
  els.exampleChips.appendChild(btn);
});

// Form submit
els.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(els.form);
  const meal = data.get("meal");
  const method = data.get("method");
  const servings = data.get("servings");
  const output = generateFromQuery(meal, method, servings);
  render(output);
});

// Show all methods as tabs
els.showAllBtn.addEventListener("click", () => {
  const data = new FormData(els.form);
  const meal = data.get("meal");
  const method = data.get("method");
  const servings = data.get("servings");
  const output = generateFromQuery(meal, method, servings);
  render({ ...output, showTabs: true });
});

// Copy & print
els.copyBtn.addEventListener("click", async () => {
  const text = buildCopyText();
  try {
    await navigator.clipboard.writeText(text);
    flash(els.copyBtn, "Copied");
  } catch (_) {
    alert("Copy failed. Please copy manually.");
  }
});
els.printBtn.addEventListener("click", () => window.print());

function flash(el, label) {
  const original = el.textContent;
  el.textContent = label;
  el.disabled = true;
  setTimeout(() => { el.textContent = original; el.disabled = false; }, 900);
}

function render({ recipe, method, methods, servings, showTabs = false }) {
  els.results.classList.remove("hidden");
  els.recipeTitle.textContent = recipe.title;
  els.servingsLabel.textContent = `${servings} servings`;
  els.methodLabel.textContent = labelForMethod(method.key);

  // Tabs if requested
  if (showTabs && methods && methods.length > 1) {
    els.methodTabs.classList.remove("hidden");
    els.methodTabs.innerHTML = "";
    methods.forEach(m => {
      const btn = document.createElement("button");
      btn.textContent = labelForMethod(m.key);
      btn.className = `tab-${m.key} ${m.key === method.key ? "active" : ""}`;
      btn.addEventListener("click", () => {
        render({ recipe, method: m, methods, servings, showTabs: true });
      });
      els.methodTabs.appendChild(btn);
    });
  } else {
    els.methodTabs.classList.add("hidden");
    els.methodTabs.innerHTML = "";
  }

  // Ingredients
  els.ingredientsList.innerHTML = "";
  const ing = scaleIngredients(recipe.ingredients, recipe.baseServings, servings);
  ing.forEach(i => {
    const li = document.createElement("li");
    const qty = i.qty !== undefined ? ` ${i.qty}${i.unit ? ` ${i.unit}` : ""}` : "";
    li.textContent = `${i.item}${qty}`;
    els.ingredientsList.appendChild(li);
  });

  // Steps
  els.stepsList.innerHTML = "";
  method.steps.forEach(s => {
    const li = document.createElement("li");
    li.textContent = s;
    els.stepsList.appendChild(li);
  });
}

function labelForMethod(key) {
  return key === "gas" ? "Gas" : key === "electric" ? "Electricity" : "Air fryer";
}

function buildCopyText() {
  const title = els.recipeTitle.textContent?.trim() || "Recipe";
  const servings = els.servingsLabel.textContent?.trim() || "";
  const method = els.methodLabel.textContent?.trim() || "";
  const ingredients = Array.from(els.ingredientsList.querySelectorAll("li")).map(li => `- ${li.textContent}`).join("\n");
  const steps = Array.from(els.stepsList.querySelectorAll("li")).map((li, i) => `${i + 1}. ${li.textContent}`).join("\n");
  return `${title}\n${servings} • ${method}\n\nIngredients\n${ingredients}\n\nInstructions\n${steps}`;
}

// Initial state: prefill examples
els.mealInput.value = "roast chicken";
document.querySelector('input[name="method"][value="gas"]').checked = true;

