
var searchButtonEl = document.getElementById("search-button");
var searchTermEl = document.getElementById("keyword-text") //e.g Chicken
var recipeSearchAppID = "d2a0908b";
var recipeSearchAppKey = "6a95aab79ad4dec19b99622d9625382e";
// var recipeNutritionAppID = "8f0d8aac";
// var recipeNutritionAppKey = "188bfe0aca8fc01b7aa9e29ef1001500";
var recipeAutoCompleteAppID = "5e3387fb";
var recipeAutoCompleteAppKey = "8d9d3621066e7717beeb5e70e9967500";
var healthLabelEl = document.getElementById("health-label"); //e.g alcohol free, celery free etc.
var cuisineTypeEl = document.getElementById("cuisine-type");//asian, american etc.
var mealTypeEl = document.getElementById("meal-type"); //dinner, lunch etc.
var ingredientEl = document.getElementById("ingredient");

var repos;
function getRecipeSearchApi(event) {
    //Use this when submitting form so that it prevents a full page refresh which clears the console.
    event.preventDefault();

    var searchTermValue = searchTermEl.value.trim();
    var healthLabelValue = healthLabelEl.value;
    var cuisineTypeValue = cuisineTypeEl.value;
    var mealTypeValue = mealTypeEl.value;
    console.log(searchTermValue, healthLabelValue, cuisineTypeValue, mealTypeValue)

    recipeSearchUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTermValue}&app_id=${recipeSearchAppID}&app_key=${recipeSearchAppKey}&health=${healthLabelValue}&cuisineType=${cuisineTypeValue}&mealType=${mealTypeValue}&imageSize=REGULAR`
    // recipeSearchUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=d2a0908b&app_key=6a95aab79ad4dec19b99622d9625382e&health=alcohol-free&cuisineType=Asian&mealType=Dinner&imageSize=REGULAR`

  fetch(recipeSearchUrl)
    .then(function (response) {
      return response.json();
    }) 
    .then(function(data) {
        repos = data;
        console.log(data);
        // var recipeSearchFoodID = "" //TODO change to actual Food ID
        // var recipeSearchUri = "" //TODO change to actual URI
        //getRecipeNutritionApi(recipeSearchFoodID,recipeSearchUri);
        displaySummaryRecipeCards(data);
    })  
}

function getRecipeAutoCompleteApi() {

  var searchTermValue = searchTermEl.value.trim();
  var recipeAutoCompleteUrl = `https://api.edamam.com/auto-complete?app_id=${recipeAutoCompleteAppID}&app_key=${recipeAutoCompleteAppKey}&q=${searchTermValue}&limit=5`;
  fetch(recipeAutoCompleteUrl)
  .then(function (response) {
      return response.json();
  })
  .then(function(data) {
    console.log(data); 
    //postion absolute to fix the box then display the box under form/display as a list/display box z-index
    
    ingredientEl.replaceChildren();

    data.forEach(function(ingredient) {

        var ingredientValue = document.createElement('option');
        //ingredientEl.setAttribute("class", "visible");
        ingredientValue.setAttribute("value", ingredient);
        ingredientValue.innerText = ingredient;
        ingredientEl.appendChild(ingredientValue);

    })

  });
}

searchButtonEl.addEventListener('click', getRecipeSearchApi);
searchTermEl.addEventListener('keydown', getRecipeAutoCompleteApi);

// function getRecipeNutritionApi(recipeSearchFoodID,recipeSearchUri) {
//   var recipeNutritionApiUrl = `https://api.edamam.com/api/nutrition-details?app_id=${recipeNutritionAppID}&app_key=${recipeNutritionAppKey}`;
//   fetch(recipeNutritionApiUrl)
//   .then(function (response) {
//       return response.json();
//   })
//   .then(function(data) {
//     console.log(data); 

//   });
// }

var recipeCardContainerEl = document.querySelector(".recipe-card-container");
var recipeCardEl = document.querySelectorAll(".recipe-card");
var saveRecipeContainerEl = document.querySelector("#saved-recipes");

//function to display the fivedayforecast 
function displaySummaryRecipeCards(repos){

    //Clear out five recipe cards
    for(var i=0; i<recipeCardEl.length; i++){
        recipeCardEl[i].innerHTML = "";
        recipeCardEl[i].setAttribute("data-index", i);
    };

    //if there are no repos found then display text to reflect
    if(repos.length === 0){
        recipeCardContainerEl.textContent = "No repositories found - Please check your city name";
        return;
    };

    for(var i=0; i<5; i++){

        //Gather all the necessary information for the recipe cards
        //Gather recipe title
        var recipeTitle = repos.hits[i].recipe.label;
        //Number of servings the recipe makes
        var numberOfServings =  repos.hits[i].recipe.yield + " Servings";
        //Number of kcal in the recipe
        var kcalCount = repos.hits[i].recipe.calories.toFixed(1) + " kcal";
        //Protein amount in grams
        var proteinAmount = "Protein: " + repos.hits[i].recipe.totalNutrients.PROCNT.quantity.toFixed(1) + " g";
        var fatAmount = "Fat: " + repos.hits[i].recipe.totalNutrients.FAT.quantity.toFixed(1) + " g";
        var carbAmount = "Carb: " + repos.hits[i].recipe.totalNutrients.CHOCDF.quantity.toFixed(1) + " g";
        var imagePath = repos.hits[i].recipe.image;

        //Create the child elements
        var baseInfoContainerEl = document.createElement('div');
        baseInfoContainerEl.classList.add("recipe-card-info");
        var recipeTitleEl = document.createElement('h3');
        var numberOfServingsEl = document.createElement('p');
        var kcalCountEl = document.createElement('p');

        var macroInfoContainerEl = document.createElement('div');
        macroInfoContainerEl.classList.add("recipe-card-nutrition");
        var proteinAmountEl = document.createElement('p');
        var fatAmountEl = document.createElement('p');
        var carbAmountEl = document.createElement('p');

        var imageContainerEl = document.createElement('img');
        imageContainerEl.classList.add("recipe-card-img");

        //Apply the text content using the gathered information and child elements
        recipeTitleEl.textContent = recipeTitle;
        numberOfServingsEl.textContent = numberOfServings;
        kcalCountEl.textContent = kcalCount;

        proteinAmountEl.textContent = proteinAmount;
        fatAmountEl.textContent = fatAmount;
        carbAmountEl.textContent = carbAmount;

        imageContainerEl.setAttribute("src", imagePath);

        baseInfoContainerEl.appendChild(recipeTitleEl);
        baseInfoContainerEl.appendChild(numberOfServingsEl);
        baseInfoContainerEl.appendChild(kcalCountEl);

        macroInfoContainerEl.appendChild(proteinAmountEl);
        macroInfoContainerEl.appendChild(fatAmountEl);
        macroInfoContainerEl.appendChild(carbAmountEl);

        recipeCardEl[i].appendChild(baseInfoContainerEl);
        recipeCardEl[i].appendChild(macroInfoContainerEl);
        recipeCardEl[i].appendChild(imageContainerEl);
        baseInfoContainerEl.setAttribute("data-index", i);
        macroInfoContainerEl.setAttribute("data-index", i);
        imageContainerEl.setAttribute("data-index", i);

    }

};

recipeCardContainerEl.addEventListener("click", function(event){
    var recipeIndex = event.target.getAttribute("data-index");
    console.log(recipeIndex);
    // getRecipeSearchApi(event);
    displayChosenRecipeCard(repos, recipeIndex);
});

function displayChosenRecipeCard(repos, recipeIndex) {
    //Gather all the necessary information for the recipe cards
    //Gather recipe title
    var recipeTitle = repos.hits[recipeIndex].recipe.label;
    //Number of servings the recipe makes
    var numberOfServings =  repos.hits[recipeIndex].recipe.yield;
    //Number of kcal in the recipe
    var kcalCount = repos.hits[recipeIndex].recipe.calories.toFixed(1);
    //Protein amount in grams
    var proteinAmount = repos.hits[recipeIndex].recipe.totalNutrients.PROCNT.quantity.toFixed(1);
    var fatAmount = repos.hits[recipeIndex].recipe.totalNutrients.FAT.quantity.toFixed(1);
    var carbAmount = repos.hits[recipeIndex].recipe.totalNutrients.CHOCDF.quantity.toFixed(1);
    var imagePath = repos.hits[recipeIndex].recipe.image;
    var recipeUrl = repos.hits[recipeIndex].recipe.url;
    var recipeLength = repos.hits[recipeIndex].recipe.ingredientLines;
    var ingredientListEl = document.createElement('ul');

    //Create the child elements for the base information div
    var baseInfoContainerEl = document.createElement('div');
    baseInfoContainerEl.classList.add("recipe-card-info");
    var recipeTitleEl = document.createElement('h3');
    var numberOfServingsEl = document.createElement('p');
    var kcalCountEl = document.createElement('p');
    var proteinAmountEl = document.createElement('p');
    var fatAmountEl = document.createElement('p');
    var carbAmountEl = document.createElement('p');
    var ingredientListHeaderEl = document.createElement('h3');

    //Loop through ingredient list and pull
    for(var i=0; i<recipeLength.length; i++){
        var ingredientListItemEl = document.createElement('li');
        ingredientListItemEl.textContent = recipeLength[i];
        ingredientListEl.appendChild(ingredientListItemEl);
    };

    var shoppingList = repos.hits[recipeIndex].recipe.ingredients;
    var shoppingListHeaderEl = document.createElement('h3');
    shoppingListHeaderEl.textContent = "Possible Shopping List";
    var shoppingListEl = document.createElement('ul');
    for(var i=0; i < shoppingList.length; i++){
        var shoppingListItemsEl = document.createElement('li');
        shoppingListItemsEl.textContent = shoppingList[i].food;
        shoppingListEl.appendChild(shoppingListItemsEl);        
    };

    var imageContainerEl = document.createElement('img');
    imageContainerEl.classList.add("recipe-card-info");
    var saveThisRecipeEl = document.createElement('button');
    saveThisRecipeEl.setAttribute("data-index", recipeIndex);

    //Apply the text content using the gathered information and child elements
    recipeTitleEl.textContent = recipeTitle;
    numberOfServingsEl.textContent = numberOfServings + " Servings";
    kcalCountEl.textContent = kcalCount + " kcal";
    proteinAmountEl.textContent = "Protein: " + proteinAmount + " g";
    fatAmountEl.textContent = "Fat: " + fatAmount + " g";
    carbAmountEl.textContent = "Carb: " + carbAmount + " g";
    ingredientListHeaderEl.textContent = "Ingredient List";
    saveThisRecipeEl.textContent = "Save This Recipe!";

    imageContainerEl.setAttribute("src", imagePath);

    //Appending Children to the base information
    baseInfoContainerEl.appendChild(recipeTitleEl);
    baseInfoContainerEl.appendChild(proteinAmountEl);
    baseInfoContainerEl.appendChild(fatAmountEl);
    baseInfoContainerEl.appendChild(carbAmountEl);
    baseInfoContainerEl.appendChild(ingredientListHeaderEl);
    baseInfoContainerEl.appendChild(ingredientListEl);
    baseInfoContainerEl.appendChild(shoppingListHeaderEl);
    baseInfoContainerEl.appendChild(shoppingListEl);
    baseInfoContainerEl.appendChild(saveThisRecipeEl);

    //Nutrition Information Card Elements

    var nutritionInfoCardEl = document.createElement('div');
    var nutritionInfoCardHeaderEl = document.createElement('h4');
    var nutritionNumberOfServingsEl = document.createElement('p');
    var amountPerServingHeaderEl = document.createElement('p');
    var nutritionCaloriesEl = document.createElement('p')
    var percentDailyValueEl = document.createElement('p');
    var nutritionFatEl = document.createElement('p');
    var nutritionCholesterolEl = document.createElement('p');
    var nutritionSodiumEl = document.createElement('p');
    var nutritionCarbEl = document.createElement('p');
    var nutritionFiberEl = document.createElement('p');
    var nutritionSugarsEl = document.createElement('p');
    var nutritionProteinEl = document.createElement('p');
    var disclaimerEl = document.createElement('p');

    //variables that pull

    //Text content of each of the new elements
    nutritionInfoCardHeaderEl.textContent = "Nutrition Facts";
    nutritionNumberOfServingsEl.textContent = numberOfServings + " servings per recipe";
    amountPerServingHeaderEl.textContent = "Amount Per Serving";
    nutritionCaloriesEl.textContent = "Calories " + kcalCount;
    percentDailyValueEl.textContent = "% Daily Value*";
    nutritionFatEl.textContent = "Total Fat " + fatAmount + "g" + " " + repos.hits[recipeIndex].recipe.totalDaily.FAT.quantity.toFixed(1) + "%";
    nutritionCholesterolEl.textContent = "Cholesterol " + repos.hits[recipeIndex].recipe.totalNutrients.CHOLE.quantity.toFixed(1) + " mg" + " " + repos.hits[recipeIndex].recipe.totalDaily.CHOLE.quantity.toFixed(1) + "%";
    nutritionSodiumEl.textContent = "Sodium " + repos.hits[recipeIndex].recipe.totalNutrients.NA.quantity.toFixed(1) + " mg" +  " " + repos.hits[recipeIndex].recipe.totalDaily.NA.quantity.toFixed(1) + "%";
    nutritionCarbEl.textContent = "Total Carb " + carbAmount + " g" + " " + repos.hits[recipeIndex].recipe.totalDaily.CHOCDF.quantity.toFixed(1) + "%";
    nutritionFiberEl.textContent = "Dietary Fiber " + repos.hits[recipeIndex].recipe.totalNutrients.FIBTG.quantity.toFixed(1) + " g" + " " + repos.hits[recipeIndex].recipe.totalDaily.FIBTG.quantity.toFixed(1) + "%";
    nutritionSugarsEl.textContent = "Total Sugars " + repos.hits[recipeIndex].recipe.totalNutrients.SUGAR.quantity.toFixed(2) + " g";
    nutritionProteinEl.textContent = "Protein " + proteinAmount + " g" + " " + repos.hits[recipeIndex].recipe.totalDaily.PROCNT.quantity.toFixed(1) + "%";
    disclaimerEl.textContent = "*Percent Daily Values are based on 2000 calorie diet";

    nutritionInfoCardEl.appendChild(nutritionInfoCardHeaderEl);
    nutritionInfoCardEl.appendChild(nutritionNumberOfServingsEl);
    nutritionInfoCardEl.appendChild(amountPerServingHeaderEl);
    nutritionInfoCardEl.appendChild(nutritionCaloriesEl);
    nutritionInfoCardEl.appendChild(percentDailyValueEl);
    nutritionInfoCardEl.appendChild(nutritionFatEl);
    nutritionInfoCardEl.appendChild(nutritionCholesterolEl);
    nutritionInfoCardEl.appendChild(nutritionSodiumEl);
    nutritionInfoCardEl.appendChild(nutritionCarbEl);
    nutritionInfoCardEl.appendChild(nutritionFiberEl);
    nutritionInfoCardEl.appendChild(nutritionSugarsEl);
    nutritionInfoCardEl.appendChild(nutritionProteinEl);
    nutritionInfoCardEl.appendChild(disclaimerEl);

    recipeCardEl[recipeIndex].innerHTML = "";
    recipeCardEl[recipeIndex].appendChild(baseInfoContainerEl);
    recipeCardEl[recipeIndex].appendChild(imageContainerEl);
    recipeCardEl[recipeIndex].appendChild(nutritionInfoCardEl);

    saveThisRecipeEl.addEventListener("click", function(){
        var recipeTitleStorage = JSON.parse(localStorage.getItem("recipeTitle")) || [];
        var recipeUrlStorage = JSON.parse(localStorage.getItem("recipeUrl")) || [];
    
        if(!recipeUrlStorage.includes(recipeUrl)){
            recipeTitleStorage.push(recipeTitle);
            recipeUrlStorage.push(recipeUrl)
            var recipeTitleHistoryEl = document.createElement("button");
            var recipeUrlEl = document.createElement("a");
            recipeUrlEl.href = recipeUrl;
            recipeTitleHistoryEl.appendChild(recipeUrlEl);
            recipeTitleHistoryEl.textContent = recipeTitle;
            //classes that the button needs?
            recipeTitleHistoryEl.classList = "uk-button uk-button-default";
            saveRecipeContainerEl.appendChild(recipeTitleHistoryEl);
        } else {
            //Let the user know there is already a history button for a city if it was previously searched
            alert("That recipe is already in your recents!");
        };
    
        //Store the new array with any additional cities in local storage
        localStorage.setItem("recipeTitle", JSON.stringify(recipeTitleStorage));
        localStorage.setItem("recipeUrl", JSON.stringify(recipeUrlStorage));
    })
};

//Populate the search history city buttons through page reload
window.addEventListener("load", function(){
    //Pull the local storage cities and store them as an array
    var recipeUrlReload = JSON.parse(localStorage.getItem("recipeUrl")) || [];
    var recipeTitleReload = JSON.parse(localStorage.getItem("recipeTitle")) || [];

    //Go through each of the cities in the array and create a button with the city as a data attribute
    for(var i=0; i<recipeUrlReload.length; i++){
        var recipeTitleHistoryEl = document.createElement("button");
        var recipeUrlEl = document.createElement("a");
        recipeUrlEl.href = recipeUrlReload[i];
        recipeTitleHistoryEl.appendChild(recipeUrlEl);
        recipeTitleHistoryEl.textContent = recipeTitleReload[i];
        //classes that the button needs?
        recipeTitleHistoryEl.classList = "uk-button uk-button-default";
        //determine where the saved buttons are going
        saveRecipeContainerEl.appendChild(recipeTitleHistoryEl);
    };
})

var clearRecipeHistoryEl = document.querySelector(".clear-recipe-history");
clearRecipeHistoryEl.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
});

