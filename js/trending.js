// Function to fetch random trending recipes
async function fetchTrendingRecipes() {
    try {
        const recipePromises = [];
        const numberOfRecipes = 5; // Number of random recipes to fetch

        // Fetch multiple random recipes
        for (let i = 0; i < numberOfRecipes; i++) {
            recipePromises.push(fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(response => response.json()));
        }

        // Wait for all fetch requests to complete
        const recipesArray = await Promise.all(recipePromises);
        const recipes = recipesArray.map(data => data.meals[0]);
        return recipes;
    } catch (error) {
        console.error('Failed to fetch recipes:', error);
        return [];
    }
}

// Function to generate HTML for a recipe card
function generateRecipeHTML(recipe) {
    // Using properties from the MealDB API response
    return `
        <div class="editor-card">
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <div class="editor-card-content">
                <h3>${recipe.strMeal}</h3>
                <div class="rating">
                    <span>☆</span><span>☆</span><span>☆
                    </span><span>☆</span><span>☆</span>
                    <p>4/5</p>
                </div>
                <div class="details">
                    <p>30 Mins</p>
                    <p><span><i class="fas fa-heart"></i> <span class="like-count">100</span></span></p>
                </div>
            </div>
        </div>
    `;
}

// Function to update the trending recipes on the page
async function updateTrendingRecipes() {
    const recipes = await fetchTrendingRecipes();
    console.log('Fetched Recipes:', recipes); // Check if recipes are fetched
    const html = recipes.map(generateRecipeHTML).join('');
    document.querySelector('.editor-card-list').innerHTML = html;

    // Select all like buttons
    const likeButtons = document.querySelectorAll('.fa-heart');
  
    likeButtons.forEach((button, index) => {
      // Load the initial count from local storage
      let count = localStorage.getItem(`likeCount${index}`) || 0;
      button.parentNode.querySelector('.like-count').textContent = count;
  
      // Add click event listener
      button.addEventListener('click', () => {
        // Increase count, update display, and save to local storage
        count++;
        button.parentNode.querySelector('.like-count').textContent = count;
        localStorage.setItem(`likeCount${index}`, count);
      });
    });
}

// Initial call to update trending recipes
updateTrendingRecipes();
