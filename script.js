// Recipe database and cooking instructions
const recipeDatabase = {
    "spaghetti carbonara": {
        ingredients: [
            "400g spaghetti",
            "200g pancetta or guanciale",
            "4 large eggs",
            "100g Pecorino Romano cheese",
            "Black pepper",
            "Salt"
        ],
        cookingInstructions: {
            gas: "1. Fill a large pot with water and add salt. Place on gas stove over high heat and bring to a boil.\n2. While water is heating, cut pancetta into small cubes.\n3. In a large pan over medium heat on gas stove, cook pancetta until crispy (about 5-7 minutes).\n4. In a bowl, whisk together eggs, grated cheese, and black pepper.\n5. Cook spaghetti according to package instructions (about 8-10 minutes).\n6. Reserve 1 cup of pasta water, then drain spaghetti.\n7. Add hot spaghetti to the pan with pancetta and toss quickly.\n8. Remove from heat and immediately add egg mixture, stirring vigorously to create a creamy sauce.\n9. Add reserved pasta water as needed to reach desired consistency.\n10. Serve immediately with extra grated cheese and black pepper.",
            electric: "1. Fill a large pot with water and add salt. Place on electric stove over high heat setting and bring to a boil.\n2. While water is heating, cut pancetta into small cubes.\n3. In a large pan over medium heat (setting 5-6) on electric stove, cook pancetta until crispy (about 5-7 minutes).\n4. In a bowl, whisk together eggs, grated cheese, and black pepper.\n5. Cook spaghetti according to package instructions (about 8-10 minutes).\n6. Reserve 1 cup of pasta water, then drain spaghetti.\n7. Add hot spaghetti to the pan with pancetta and toss quickly.\n8. Remove from heat and immediately add egg mixture, stirring vigorously to create a creamy sauce.\n9. Add reserved pasta water as needed to reach desired consistency.\n10. Serve immediately with extra grated cheese and black pepper.",
            airfryer: "Note: Carbonara is traditionally made on stovetop. For a variation:\n1. Cut pancetta into small cubes.\n2. Place pancetta in air fryer basket at 375°F (190°C) for 8-10 minutes until crispy.\n3. Boil pasta in a separate pot on stovetop.\n4. Follow remaining steps from stovetop method, using air-fried pancetta in step 7."
        }
    },
    "grilled salmon": {
        ingredients: [
            "4 salmon fillets (6oz each)",
            "2 tbsp olive oil",
            "2 cloves garlic, minced",
            "1 lemon",
            "Salt and pepper",
            "Fresh herbs (dill or parsley)"
        ],
        cookingInstructions: {
            gas: "1. Preheat gas grill to medium-high heat (about 400°F).\n2. Pat salmon fillets dry with paper towels.\n3. Brush both sides with olive oil and season with salt, pepper, and minced garlic.\n4. Place salmon skin-side down on grill grates.\n5. Grill for 4-5 minutes per side, until salmon flakes easily with a fork.\n6. Squeeze fresh lemon juice over salmon before serving.\n7. Garnish with fresh herbs.",
            electric: "1. Preheat electric grill or grill pan to medium-high heat (setting 7-8).\n2. Pat salmon fillets dry with paper towels.\n3. Brush both sides with olive oil and season with salt, pepper, and minced garlic.\n4. Place salmon skin-side down on grill.\n5. Grill for 4-5 minutes per side, until salmon flakes easily with a fork.\n6. Squeeze fresh lemon juice over salmon before serving.\n7. Garnish with fresh herbs.",
            airfryer: "1. Preheat air fryer to 400°F (200°C).\n2. Pat salmon fillets dry with paper towels.\n3. Brush both sides with olive oil and season with salt, pepper, and minced garlic.\n4. Place salmon in air fryer basket, skin-side down if applicable.\n5. Air fry for 8-10 minutes, until salmon flakes easily with a fork.\n6. Squeeze fresh lemon juice over salmon before serving.\n7. Garnish with fresh herbs."
        }
    },
    "vegetable stir-fry": {
        ingredients: [
            "2 cups broccoli florets",
            "2 carrots, sliced",
            "1 bell pepper, sliced",
            "1 cup snap peas",
            "2 cloves garlic, minced",
            "2 tbsp soy sauce",
            "1 tbsp sesame oil",
            "1 tbsp vegetable oil",
            "Salt and pepper",
            "Sesame seeds (optional)"
        ],
        cookingInstructions: {
            gas: "1. Prepare all vegetables by cutting them into bite-sized pieces.\n2. Heat vegetable oil in a large wok or pan over high heat on gas stove.\n3. Add garlic and stir-fry for 30 seconds until fragrant.\n4. Add carrots and broccoli first (harder vegetables), stir-fry for 2-3 minutes.\n5. Add bell pepper and snap peas, stir-fry for another 2 minutes.\n6. Add soy sauce and sesame oil, toss everything together.\n7. Season with salt and pepper to taste.\n8. Stir-fry for 1 more minute until vegetables are crisp-tender.\n9. Garnish with sesame seeds if desired and serve immediately.",
            electric: "1. Prepare all vegetables by cutting them into bite-sized pieces.\n2. Heat vegetable oil in a large wok or pan over high heat (setting 8-9) on electric stove.\n3. Add garlic and stir-fry for 30 seconds until fragrant.\n4. Add carrots and broccoli first (harder vegetables), stir-fry for 2-3 minutes.\n5. Add bell pepper and snap peas, stir-fry for another 2 minutes.\n6. Add soy sauce and sesame oil, toss everything together.\n7. Season with salt and pepper to taste.\n8. Stir-fry for 1 more minute until vegetables are crisp-tender.\n9. Garnish with sesame seeds if desired and serve immediately.",
            airfryer: "1. Prepare all vegetables by cutting them into bite-sized pieces.\n2. Preheat air fryer to 375°F (190°C).\n3. Toss vegetables with vegetable oil, garlic, salt, and pepper.\n4. Place vegetables in air fryer basket in a single layer.\n5. Air fry for 10-12 minutes, shaking basket halfway through.\n6. In the last 2 minutes, add soy sauce and sesame oil.\n7. Garnish with sesame seeds if desired and serve immediately."
        }
    },
    "chicken curry": {
        ingredients: [
            "500g chicken breast, cubed",
            "2 onions, chopped",
            "3 cloves garlic, minced",
            "1-inch ginger, grated",
            "2 tbsp curry powder",
            "1 can coconut milk",
            "2 tbsp vegetable oil",
            "Salt",
            "Fresh cilantro",
            "Rice for serving"
        ],
        cookingInstructions: {
            gas: "1. Heat vegetable oil in a large pan over medium heat on gas stove.\n2. Add onions and cook until soft and translucent (about 5 minutes).\n3. Add garlic and ginger, cook for 1 minute until fragrant.\n4. Add curry powder and stir for 30 seconds.\n5. Add chicken cubes and cook until browned on all sides (5-7 minutes).\n6. Pour in coconut milk and bring to a simmer.\n7. Reduce heat to low and simmer for 15-20 minutes until chicken is cooked through.\n8. Season with salt to taste.\n9. Garnish with fresh cilantro and serve with rice.",
            electric: "1. Heat vegetable oil in a large pan over medium heat (setting 5) on electric stove.\n2. Add onions and cook until soft and translucent (about 5 minutes).\n3. Add garlic and ginger, cook for 1 minute until fragrant.\n4. Add curry powder and stir for 30 seconds.\n5. Add chicken cubes and cook until browned on all sides (5-7 minutes).\n6. Pour in coconut milk and bring to a simmer.\n7. Reduce heat to low (setting 2-3) and simmer for 15-20 minutes until chicken is cooked through.\n7. Season with salt to taste.\n8. Garnish with fresh cilantro and serve with rice.",
            airfryer: "Note: Curry is traditionally made on stovetop. For air fryer method:\n1. Preheat air fryer to 375°F (190°C).\n2. Season chicken cubes with curry powder, salt, garlic, and ginger.\n3. Toss with 1 tbsp oil and place in air fryer basket.\n4. Air fry for 12-15 minutes until chicken is cooked through.\n5. Meanwhile, sauté onions in a pan on stovetop, then add coconut milk to create sauce.\n6. Combine cooked chicken with curry sauce.\n7. Garnish with fresh cilantro and serve with rice."
        }
    },
    "beef tacos": {
        ingredients: [
            "500g ground beef",
            "1 onion, chopped",
            "2 cloves garlic, minced",
            "2 tbsp taco seasoning",
            "8 taco shells or tortillas",
            "1 cup shredded lettuce",
            "1 cup diced tomatoes",
            "1 cup shredded cheese",
            "Sour cream",
            "Salsa"
        ],
        cookingInstructions: {
            gas: "1. Heat a large pan over medium heat on gas stove.\n2. Add ground beef and cook, breaking it up with a spoon, until browned (5-7 minutes).\n3. Add onion and garlic, cook until onion is translucent (3-4 minutes).\n4. Add taco seasoning and 1/2 cup water, stir well.\n5. Simmer for 5 minutes until sauce thickens.\n6. Warm taco shells in oven or on dry pan.\n7. Assemble tacos with beef, lettuce, tomatoes, cheese, sour cream, and salsa.",
            electric: "1. Heat a large pan over medium heat (setting 5) on electric stove.\n2. Add ground beef and cook, breaking it up with a spoon, until browned (5-7 minutes).\n3. Add onion and garlic, cook until onion is translucent (3-4 minutes).\n4. Add taco seasoning and 1/2 cup water, stir well.\n5. Simmer for 5 minutes until sauce thickens.\n6. Warm taco shells in oven or on dry pan.\n7. Assemble tacos with beef, lettuce, tomatoes, cheese, sour cream, and salsa.",
            airfryer: "1. Preheat air fryer to 375°F (190°C).\n2. Mix ground beef with onion, garlic, and taco seasoning.\n3. Form into small patties or meatballs.\n4. Air fry for 8-10 minutes until cooked through.\n5. Crumble the cooked beef mixture.\n6. Warm taco shells in air fryer at 350°F for 2-3 minutes.\n7. Assemble tacos with beef, lettuce, tomatoes, cheese, sour cream, and salsa."
        }
    }
};

// Default recipes for common requests
const defaultRecipes = {
    "default": {
        ingredients: [
            "Please be more specific with your meal request for accurate ingredients.",
            "Example: 'spaghetti carbonara', 'grilled salmon', 'vegetable stir-fry'"
        ],
        cookingInstructions: {
            gas: "Please generate a specific recipe first for detailed cooking instructions.",
            electric: "Please generate a specific recipe first for detailed cooking instructions.",
            airfryer: "Please generate a specific recipe first for detailed cooking instructions."
        }
    }
};

// Ingredient selection functionality
class IngredientSelector {
    constructor() {
        this.selectedIngredients = new Set();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSelectedIngredients();
        this.updateSelectedList();
    }

    setupEventListeners() {
        // Category filter buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterByCategory(e.target.dataset.category);
            });
        });

        // Ingredient checkboxes
        document.querySelectorAll('.ingredient-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleIngredient(e.target.value, e.target.checked);
            });
        });

        // Clear selection button
        document.getElementById('clear-selection').addEventListener('click', () => {
            this.clearSelection();
        });
    }

    filterByCategory(category) {
        // Update active category button
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-category="${category}"]`).classList.add('active');

        // Filter ingredients
        const items = document.querySelectorAll('.ingredient-item');
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    toggleIngredient(ingredient, isSelected) {
        if (isSelected) {
            this.selectedIngredients.add(ingredient);
        } else {
            this.selectedIngredients.delete(ingredient);
        }
        this.saveSelectedIngredients();
        this.updateSelectedList();
    }

    updateSelectedList() {
        const selectedList = document.getElementById('selected-list');
        selectedList.innerHTML = '';

        if (this.selectedIngredients.size === 0) {
            selectedList.innerHTML = '<p style="color: #666; font-style: italic;">No ingredients selected</p>';
            return;
        }

        this.selectedIngredients.forEach(ingredient => {
            const item = document.createElement('div');
            item.className = 'selected-item';
            item.innerHTML = `
                <span>${this.formatIngredientName(ingredient)}</span>
                <button class="remove-btn" onclick="ingredientSelector.removeIngredient('${ingredient}')">×</button>
            `;
            selectedList.appendChild(item);
        });
    }

    removeIngredient(ingredient) {
        this.selectedIngredients.delete(ingredient);
        const checkbox = document.querySelector(`input[value="${ingredient}"]`);
        if (checkbox) {
            checkbox.checked = false;
        }
        this.saveSelectedIngredients();
        this.updateSelectedList();
    }

    clearSelection() {
        this.selectedIngredients.clear();
        document.querySelectorAll('.ingredient-item input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        this.saveSelectedIngredients();
        this.updateSelectedList();
    }

    saveSelectedIngredients() {
        localStorage.setItem('selectedIngredients', JSON.stringify([...this.selectedIngredients]));
    }

    loadSelectedIngredients() {
        const saved = localStorage.getItem('selectedIngredients');
        if (saved) {
            this.selectedIngredients = new Set(JSON.parse(saved));
            // Update checkboxes to match saved selection
            this.selectedIngredients.forEach(ingredient => {
                const checkbox = document.querySelector(`input[value="${ingredient}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    }

    formatIngredientName(ingredient) {
        return ingredient.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }
}

// Recipe generator functionality
class RecipeGenerator {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('generate-recipe').addEventListener('click', () => {
            this.generateRecipe();
        });

        document.querySelectorAll('.method-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchCookingMethod(e.target.dataset.method);
            });
        });
    }

    generateRecipe() {
        const mealRequest = document.getElementById('meal-request').value.toLowerCase().trim();
        
        if (!mealRequest) {
            alert('Please enter a meal request');
            return;
        }

        const recipe = this.findRecipe(mealRequest);
        this.displayRecipe(recipe, mealRequest);
    }

    findRecipe(mealRequest) {
        // Try to find exact match first
        if (recipeDatabase[mealRequest]) {
            return recipeDatabase[mealRequest];
        }

        // Try to find partial matches
        for (const [key, recipe] of Object.entries(recipeDatabase)) {
            if (mealRequest.includes(key) || key.includes(mealRequest)) {
                return recipe;
            }
        }

        // Return default if no match found
        return defaultRecipes.default;
    }

    displayRecipe(recipe, originalRequest) {
        const recipeOutput = document.getElementById('recipe-output');
        const ingredientsList = document.getElementById('ingredients-list');
        const cookingInstructions = document.getElementById('cooking-instructions');

        // Display ingredients
        ingredientsList.innerHTML = '';
        recipe.ingredients.forEach(ingredient => {
            const item = document.createElement('div');
            item.className = 'ingredient-item-output';
            item.textContent = ingredient;
            ingredientsList.appendChild(item);
        });

        // Display default cooking instructions (gas)
        cookingInstructions.textContent = recipe.cookingInstructions.gas;

        // Set active method button to gas
        document.querySelectorAll('.method-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('[data-method="gas"]').classList.add('active');

        // Show recipe output
        recipeOutput.classList.remove('hidden');
    }

    switchCookingMethod(method) {
        const cookingInstructions = document.getElementById('cooking-instructions');
        const mealRequest = document.getElementById('meal-request').value.toLowerCase().trim();
        
        const recipe = this.findRecipe(mealRequest);
        
        if (recipe && recipe.cookingInstructions[method]) {
            cookingInstructions.textContent = recipe.cookingInstructions[method];
        }

        // Update active button
        document.querySelectorAll('.method-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-method="${method}"]`).classList.add('active');
    }
}

// Initialize the app
let ingredientSelector;
let recipeGenerator;

document.addEventListener('DOMContentLoaded', () => {
    ingredientSelector = new IngredientSelector();
    recipeGenerator = new RecipeGenerator();
});

// Add keyboard support for recipe generation
document.getElementById('meal-request').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        recipeGenerator.generateRecipe();
    }
});