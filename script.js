document.getElementById('search').addEventListener("click", function(){
    document.getElementById('results').innerHTML='';
    document.getElementById('recipe-info').innerHTML='';
    const searchTerm = document.getElementById("searchBox").value;
    searchRecipe(searchTerm);  
})

function searchRecipe(recipeName){
    fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`)
    .then (res => res.json())
    .then (data => {
        getMeal(data.meals);
    })
    .catch(error => alert(`No recipe found for ${recipeName}`));
}

function getMeal(meal){
    meal.forEach (meal => {
        const mealImage = meal.strMealThumb;
        const mealName = meal.strMeal;
        const mealId = meal.idMeal;
        const divBody = document.createElement('div')
        divBody.innerHTML=`
        <div class="card result" onclick="getMealDetails(${mealId})">
        <img src="${mealImage}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-text">${mealName}</h5>
        </div>
        </div>
        `;
        document.getElementById('results').appendChild(divBody);

    })
}

function getMealDetails(theMealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${theMealID}`)
    .then (res => res.json())
    .then (data => {
        displayMealDetail(data.meals[0]);
    })
}

function displayMealDetail(data){
    const theMealImage = data.strMealThumb;
    const theMealName = data.strMeal;
    let ingredients = [data.strIngredient1, data.strIngredient2, data.strIngredient3, data.strIngredient4, data.strIngredient5, data.strIngredient6, data.strIngredient7, data.strIngredient8, data.strIngredient9, data.strIngredient10, data.strIngredient11, data.strIngredient12, data.strIngredient13, data.strIngredient14, data.strIngredient15, data.strIngredient16, data.strIngredient17, data.strIngredient18, data.strIngredient19, data.strIngredient20];
    const ul = document.createElement('ul');
    ul.className = "card-text";
    ingredients.forEach(ingredient => {
        if (ingredient == null || ingredient == undefined || ingredient.length < 1){
            return;
        }
        else {
            const li = document.createElement('li');
            li.innerText = ingredient;
            ul.appendChild(li);
        }
    })
    const recipeInfo = document.getElementById('recipe-info');
    const mealDetails = document.createElement('div');
    mealDetails.innerHTML= `
            <div class="card mb-3">
            <img src="${theMealImage}" class="card-img-top img-fluid img-thumbnail" alt="${theMealName}">
            <div class="card-body">
            <h5 class="card-title">${theMealName}</h5>
            <br><p class="card-text"><b>Ingredients:</b></p>
            ${ul.innerHTML}
            </div>
            </div>
    `
    recipeInfo.innerHTML="";
    recipeInfo.appendChild(mealDetails);
}