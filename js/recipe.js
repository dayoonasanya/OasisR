// Fetch recipes from TheMealDB API
fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then(response => response.json())
    .then(data => {
        const recipes = data.meals;
        const recipeContainer = document.getElementById('recipe-container');
        const recipeDetails = document.getElementById('recipe-details');
        const overlay = document.getElementById('overlay');
        const closeDetails = document.getElementById('close-details');

        // Iterate over each recipe and create a card
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card';

            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.strMealThumb;
            recipeImage.alt = recipe.strMeal;

            const recipeCardContent = document.createElement('div');
            recipeCardContent.className = 'recipe-card-content';

            const recipeTitle = document.createElement('h3');
            recipeTitle.textContent = recipe.strMeal;

            const recipeCategory = document.createElement('p');
            recipeCategory.className = 'category';
            recipeCategory.textContent = `${recipe.strArea} | ${recipe.strCategory}`;

            const ingredientsTitle = document.createElement('h4');
            ingredientsTitle.textContent = 'Ingredients';

            const ingredientsList = document.createElement('div');
            ingredientsList.className = 'ingredients';

            // Add first 5 ingredients
            for (let i = 1; i <= 5; i++) {
                if (recipe[`strIngredient${i}`]) {
                    const ingredient = document.createElement('div');
                    ingredient.className = 'ingredient';
                    ingredient.textContent = recipe[`strIngredient${i}`];
                    ingredientsList.appendChild(ingredient);
                }
            }

            // Add more ingredients indicator
            const moreIngredients = document.createElement('div');
            moreIngredients.className = 'ingredient more';
            moreIngredients.textContent = `+${Object.keys(recipe).filter(key => key.includes('strIngredient') && recipe[key]).length - 5} More`;
            ingredientsList.appendChild(moreIngredients);

            const watchButton = document.createElement('button');
            watchButton.className = 'watch-button';
            watchButton.textContent = 'Learn More';
            watchButton.onclick = () => showDetails(recipe);

            // Append elements to card content
            recipeCardContent.appendChild(recipeTitle);
            recipeCardContent.appendChild(recipeCategory);
            recipeCardContent.appendChild(ingredientsTitle);
            recipeCardContent.appendChild(ingredientsList);
            recipeCardContent.appendChild(watchButton);

            // Append image and content to recipe card
            recipeCard.appendChild(recipeImage);
            recipeCard.appendChild(recipeCardContent);

            // Append recipe card to container
            recipeContainer.appendChild(recipeCard);
        });

        // Close details view
        closeDetails.onclick = () => {
            recipeDetails.classList.remove('open');
            overlay.classList.remove('open');
        };

        // Close overlay
        overlay.onclick = () => {
            recipeDetails.classList.remove('open');
            overlay.classList.remove('open');
        };
    });

// Function to show detailed view of a recipe
function showDetails(recipe) {
    document.getElementById('details-title').textContent = recipe.strMeal;
    document.getElementById('details-image').src = recipe.strMealThumb;
    document.getElementById('details-category').textContent = `${recipe.strArea} | ${recipe.strCategory}`;
    document.getElementById('details-ingredients').innerHTML = '';

    // Add all ingredients to the details view
    for (let i = 1; i <= 20; i++) {
        if (recipe[`strIngredient${i}`]) {
            const ingredient = document.createElement('li');
            ingredient.textContent = `${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`;
            document.getElementById('details-ingredients').appendChild(ingredient);
        }
    }

    // Add instructions to the details view
    const instructions = recipe.strInstructions.split('. ').map(instr => `<li>${instr}.</li>`).join('');
    document.getElementById('details-instructions').innerHTML = instructions;

    // Show the details view and overlay
    document.getElementById('recipe-details').classList.add('open');
    document.getElementById('overlay').classList.add('open');
}
