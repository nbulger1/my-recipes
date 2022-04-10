
var searchButtonEl = document.getElementById("search-button");
var searchTermEl = document.getElementById("keyword-text") //e.g Chicken
var recipeSearchAppID = "d2a0908b";
var recipeSearchAppKey = "6a95aab79ad4dec19b99622d9625382e";
var recipeAutoCompleteAppID = "5e3387fb";
var recipeAutoCompleteAppKey = "8d9d3621066e7717beeb5e70e9967500";
var healthLabelEl = document.getElementById("health-label"); //e.g alcohol free, celery free etc.
var cuisineTypeEl = document.getElementById("cuisine-type");//asian, american etc.
var mealTypeEl = document.getElementById("meal-type"); //dinner, lunch etc.
var ingredientEl = document.getElementById("ingredient");

var repos;
var isloading = true;
function getRecipeSearchApi(event) {
    //Use this when submitting form so that it prevents a full page refresh which clears the console.
    event.preventDefault();

    var searchTermValue = searchTermEl.value.trim();
    var healthLabelValue = healthLabelEl.value;
    var cuisineTypeValue = cuisineTypeEl.value;
    var mealTypeValue = mealTypeEl.value;

    recipeSearchUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTermValue}&app_id=${recipeSearchAppID}&app_key=${recipeSearchAppKey}&health=${healthLabelValue}&cuisineType=${cuisineTypeValue}&mealType=${mealTypeValue}&imageSize=REGULAR`

    isloading = true;
    if(isloading){
        var isloadingEl = document.createElement('div');
        isloadingEl.textContent = "I'm loading! Please wait!";
        recipeCardContainerEl.appendChild(isloadingEl);
    }
    
  fetch(recipeSearchUrl)
    .then(function (response) {
      return response.json();
    }) 
    .then(function(data) {
        isloading = false;
        if(isloading == false){
            isloadingEl.innerHTML = "";
        }
        repos = data;
        console.log(data);
        displaySummaryRecipeCards(data);
    })  
    //add a .catch :) with isloading = false, iserror
}

function getRecipeAutoCompleteApi() {

  var searchTermValue = searchTermEl.value.trim();
  var recipeAutoCompleteUrl = `https://api.edamam.com/auto-complete?app_id=${recipeAutoCompleteAppID}&app_key=${recipeAutoCompleteAppKey}&q=${searchTermValue}&limit=5`;
  fetch(recipeAutoCompleteUrl)
  .then(function (response) {
      return response.json();
  })
  .then(function(data) {

    ingredientEl.replaceChildren();
    data.forEach(function(ingredient) {
        var ingredientValue = document.createElement('option');
        ingredientValue.setAttribute("value", ingredient);
        ingredientValue.innerText = ingredient;
        ingredientEl.appendChild(ingredientValue);

    })

  });
}

searchButtonEl.addEventListener('click', getRecipeSearchApi);
searchTermEl.addEventListener('keydown', getRecipeAutoCompleteApi);

//Event handlers for the recipe cards and containers
var recipeCardContainerEl = document.querySelector(".recipe-card-container");
var recipeCardEl = document.querySelectorAll(".recipe-card");
var ukCardEl = document.querySelectorAll(".uk-card");
var saveRecipeContainerEl = document.querySelector("#saved-recipes");
var cardClosed = true;
//creating the click to close button and setting it to hide
var clickToCloseEl = document.createElement('button');
clickToCloseEl.setAttribute("display", "none");
//Create a save recipe button and setting it to hide
var saveThisRecipeEl = document.createElement('button');
saveThisRecipeEl.setAttribute("display", "none");
//create URL and title variable globally so they can be defined and used in multiple different functions
var recipeUrl;
var recipeTitle;


//function to display the top five recipe summaries 
function displaySummaryRecipeCards(repos){

    //Set the cardclosed boolean to true if it is false to keep track of how the page looks
    if(!cardClosed){
        cardClosed = true;
    };

    //Clear out any content in the five recipe cards
    for(var i=0; i<recipeCardEl.length; i++){
        recipeCardEl[i].innerHTML = "";
    };

    //if there are no recipes found then display text to reflect
    if(repos.count === 0){
        recipeCardContainerEl.textContent = "No Recipes Found - Please try new search criteria";
        return;
    //else if the recipe count is less than or equal to 5 then display the total number of recipes there are
    } else if(repos.count<=5){
        for(var i=0; i<repos.count; i++){
            buildRecipes(repos, i);
        }
    //else if there are more than 5 recipes found in the API call then display the first five
    } else if(repos.count>5){
        for(var i=0; i<5; i++){
            buildRecipes(repos, i);
        };
    };

};

//function to build out a recipe card that passes the API call data as well as the index value of the recipe count
function buildRecipes(repos, i){
    //Gather all the necessary information for the recipe cards
    //Gather recipe title
    var recipeTitle = repos.hits[i].recipe.label;
    //Number of servings the recipe makes
    var numberOfServings =  repos.hits[i].recipe.yield + " Servings";
    //Number of kcal in the recipe fixed to 1 decimal point
    var kcalCount = ((repos.hits[i].recipe.calories)/(repos.hits[i].recipe.yield)).toFixed(1) + " kcal per serving";
    //Protein amount in grams fixed to 1 decimal point
    var proteinAmount = "Protein: " + ((repos.hits[i].recipe.totalNutrients.PROCNT.quantity)/(repos.hits[i].recipe.yield)).toFixed(1) + " g";
    //fat amount in grams fixed to 1 decimal point
    var fatAmount = "Fat: " + ((repos.hits[i].recipe.totalNutrients.FAT.quantity)/(repos.hits[i].recipe.yield)).toFixed(1) + " g";
    //carb amount in grams fixed to 1 decimal point
    var carbAmount = "Carb: " + ((repos.hits[i].recipe.totalNutrients.CHOCDF.quantity)/(repos.hits[i].recipe.yield)).toFixed(1) + " g";
    //collect the image URL so it can be set a source later
    var imagePath = repos.hits[i].recipe.image;

    //Create the child elements in four different containers to assist with ease of styling later (base information, macronutrient info, an image container, and a container for any buttons)
    var baseInfoContainerEl = document.createElement('div');
    baseInfoContainerEl.classList.add("recipe-card-info");
    var recipeTitleEl = document.createElement('h3');
    var numberOfServingsEl = document.createElement('p');
    var kcalCountEl = document.createElement('p');

    var macroInfoContainerEl = document.createElement('div');
    macroInfoContainerEl.classList.add("recipe-card-nutrition");
    var macroInfoContainerHeaderEl = document.createElement('h4');
    var proteinAmountEl = document.createElement('p');
    var fatAmountEl = document.createElement('p');
    var carbAmountEl = document.createElement('p');

    var imageContainerEl = document.createElement('img');
    imageContainerEl.classList.add("recipe-card-img");

    var buttonContainerEl = document.createElement('div');
    //Create a click to expand variable that will allow the user to "open" the recipe card to reveal more information
    var clickToExpandEl = document.createElement('button');
    clickToExpandEl.setAttribute("display", "block");
    clickToExpandEl.setAttribute("class", "expand-button");
    clickToExpandEl.setAttribute("data-click", i);

    //Apply the text content using the gathered information and child elements
    recipeTitleEl.textContent = recipeTitle;
    numberOfServingsEl.textContent = numberOfServings;
    kcalCountEl.textContent = kcalCount;
    proteinAmountEl.textContent = proteinAmount;
    fatAmountEl.textContent = fatAmount;
    carbAmountEl.textContent = carbAmount;
    macroInfoContainerHeaderEl.textContent = "Macronutrients Per Serving";

    imageContainerEl.setAttribute("src", imagePath);

    clickToExpandEl.textContent = "Click to Expand";

    //Append all the new child elements with their text content into their appropriate divs and then add those four divs to the recipe card container in the HTML
    baseInfoContainerEl.appendChild(recipeTitleEl);
    baseInfoContainerEl.appendChild(numberOfServingsEl);
    baseInfoContainerEl.appendChild(kcalCountEl);

    buttonContainerEl.appendChild(clickToExpandEl);

    macroInfoContainerEl.appendChild(macroInfoContainerHeaderEl);
    macroInfoContainerEl.appendChild(proteinAmountEl);
    macroInfoContainerEl.appendChild(fatAmountEl);
    macroInfoContainerEl.appendChild(carbAmountEl);

    recipeCardEl[i].appendChild(baseInfoContainerEl);
    recipeCardEl[i].appendChild(macroInfoContainerEl);
    recipeCardEl[i].appendChild(imageContainerEl);
    recipeCardEl[i].appendChild(buttonContainerEl);

    //Apply the custom-card class to each of the recipe cards to style
    ukCardEl[i].classList = "custom-card";

    //Add an event listener for the click to expand button that runs the chosen recipe card display function and makes the save recipe button appear
    clickToExpandEl.addEventListener("click", function(event){
        //grab the data attribute to pass through the chosen recipe card function
        var recipeClick = event.target.getAttribute("data-click");
        if(cardClosed){
            displayChosenRecipeCard(repos, recipeClick);
            saveThisRecipeEl.setAttribute("display", "block");
        };
    });
};

//Add an event listener to the click to close button that reruns the summary recipe card function 
clickToCloseEl.addEventListener("click", function(event){
    var recipeClick = event.target.getAttribute("data-click");
    if(!cardClosed){
        displaySummaryRecipeCards(repos, recipeClick);
    };
});

//Function to create the child elements for the chosen recipe card - when the click to expand button is clicked then run this function to display more information
function displayChosenRecipeCard(repos, recipeIndex) {

    //If the card closed boolean is true then change to false now that one of the cards is open
    if(cardClosed){
        cardClosed = false;
    }
    //Gather all the necessary information for the base information portion of the open recipe card
    recipeTitle = repos.hits[recipeIndex].recipe.label;
    var numberOfServings =  repos.hits[recipeIndex].recipe.yield;
    var kcalCount = repos.hits[recipeIndex].recipe.calories.toFixed(1);
    var proteinAmount = repos.hits[recipeIndex].recipe.totalNutrients.PROCNT.quantity.toFixed(1);
    var fatAmount = repos.hits[recipeIndex].recipe.totalNutrients.FAT.quantity.toFixed(1);
    var carbAmount = repos.hits[recipeIndex].recipe.totalNutrients.CHOCDF.quantity.toFixed(1);
    var imagePath = repos.hits[recipeIndex].recipe.image;
    //redefine the recipe URL variable created globally to use it in the local storage function later
    recipeUrl = repos.hits[recipeIndex].recipe.url;
    //pull the ingredient lines into an array variable
    var recipeLength = repos.hits[recipeIndex].recipe.ingredientLines;


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
    var ingredientListEl = document.createElement('ul');

    //Loop through ingredient list and pull to create the ingredient list
    for(var i=0; i<recipeLength.length; i++){
        var ingredientListItemEl = document.createElement('li');
        ingredientListItemEl.textContent = recipeLength[i];
        ingredientListEl.appendChild(ingredientListItemEl);
    };

    //Loop through the ingredients to pull the different specific ingredients as a possible shopping list
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
    
    var buttonContainerEl = document.createElement('div');

    //Setting data attributes and classes of each button present in the open card
    saveThisRecipeEl.setAttribute("data-index", recipeIndex);
    saveThisRecipeEl.setAttribute("class", "save-button");
        
    clickToCloseEl.setAttribute("display", "block");
    clickToCloseEl.setAttribute("class", "close-button");
    clickToCloseEl.setAttribute("data-click", i);
    clickToCloseEl.textContent = "Click to Close"

    //Apply the text content using the gathered information and child elements for the base information container
    recipeTitleEl.textContent = recipeTitle;
    numberOfServingsEl.textContent = numberOfServings + " Servings";
    kcalCountEl.textContent = kcalCount + " kcal";
    proteinAmountEl.textContent = "Protein: " + proteinAmount + " g";
    fatAmountEl.textContent = "Fat: " + fatAmount + " g";
    carbAmountEl.textContent = "Carb: " + carbAmount + " g";
    ingredientListHeaderEl.textContent = "Ingredient List";
    saveThisRecipeEl.textContent = "Save This Recipe!";

    imageContainerEl.setAttribute("src", imagePath);

    //Appending Children to the base information container
    baseInfoContainerEl.appendChild(recipeTitleEl);
    baseInfoContainerEl.appendChild(proteinAmountEl);
    baseInfoContainerEl.appendChild(fatAmountEl);
    baseInfoContainerEl.appendChild(carbAmountEl);
    baseInfoContainerEl.appendChild(ingredientListHeaderEl);
    baseInfoContainerEl.appendChild(ingredientListEl);
    baseInfoContainerEl.appendChild(shoppingListHeaderEl);
    baseInfoContainerEl.appendChild(shoppingListEl);

    //Append the two buttons to the button container element
    buttonContainerEl.appendChild(saveThisRecipeEl);
    buttonContainerEl.appendChild(clickToCloseEl);

    //Create the Nutrition Information Card Elements
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

    //Apply the text content of each of the new elements - fixing the necessary values to 1 decimal point and dividing each value by the number of servings to get the appropriate values because the API gives the values for all x number of servings
    nutritionInfoCardHeaderEl.textContent = "Nutrition Facts";
    nutritionNumberOfServingsEl.textContent = numberOfServings + " servings per recipe";
    amountPerServingHeaderEl.textContent = "Amount Per Serving";
    nutritionCaloriesEl.textContent = "Calories " + (kcalCount/numberOfServings).toFixed(1);
    percentDailyValueEl.textContent = "% Daily Value*";
    nutritionFatEl.textContent = "Total Fat " + (fatAmount/numberOfServings).toFixed(1) + "g" + " " + ((repos.hits[recipeIndex].recipe.totalDaily.FAT.quantity)/(numberOfServings)).toFixed(1) + "%";
    nutritionCholesterolEl.textContent = "Cholesterol " + ((repos.hits[recipeIndex].recipe.totalNutrients.CHOLE.quantity)/(numberOfServings)).toFixed(1) + " mg" + " " + ((repos.hits[recipeIndex].recipe.totalDaily.CHOLE.quantity)/(numberOfServings)).toFixed(1) + "%";
    nutritionSodiumEl.textContent = "Sodium " + ((repos.hits[recipeIndex].recipe.totalNutrients.NA.quantity)/(numberOfServings)).toFixed(1) + " mg" +  " " + ((repos.hits[recipeIndex].recipe.totalDaily.NA.quantity)/(numberOfServings)).toFixed(1) + "%";
    nutritionCarbEl.textContent = "Total Carb " + (carbAmount/numberOfServings).toFixed(1) + " g" + " " + ((repos.hits[recipeIndex].recipe.totalDaily.CHOCDF.quantity)/(numberOfServings)).toFixed(1) + "%";
    nutritionFiberEl.textContent = "Dietary Fiber " + ((repos.hits[recipeIndex].recipe.totalNutrients.FIBTG.quantity)/(numberOfServings)).toFixed(1) + " g" + " " + ((repos.hits[recipeIndex].recipe.totalDaily.FIBTG.quantity)/(numberOfServings)).toFixed(1) + "%";
    nutritionSugarsEl.textContent = "Total Sugars " + ((repos.hits[recipeIndex].recipe.totalNutrients.SUGAR.quantity)/(numberOfServings)).toFixed(2) + " g";
    nutritionProteinEl.textContent = "Protein " + (proteinAmount/numberOfServings).toFixed(1) + " g" + " " + ((repos.hits[recipeIndex].recipe.totalDaily.PROCNT.quantity)/(numberOfServings)).toFixed(1) + "%";
    disclaimerEl.textContent = "*Percent Daily Values are based on 2000 calorie diet";

    //Append the child elements to the nutrition info card to be styled later
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

    //Once all the containers are filled - clear out the information in the chosen recipe card and refill it with the new information in the form of the four containers
    recipeCardEl[recipeIndex].innerHTML = "";
    recipeCardEl[recipeIndex].appendChild(baseInfoContainerEl);
    recipeCardEl[recipeIndex].appendChild(imageContainerEl);
    recipeCardEl[recipeIndex].appendChild(nutritionInfoCardEl);
    recipeCardEl[recipeIndex].appendChild(buttonContainerEl);
};

//Add an event listener to the save recipe button to create saved recipe buttons that are linked to the recipe title and url
saveThisRecipeEl.addEventListener("click", function(event){
    event.preventDefault();
    //Pull an recipe titles or urls already present in local storage and store them as an array
    var recipeTitleStorage = JSON.parse(localStorage.getItem("recipeTitle")) || [];
    var recipeUrlStorage = JSON.parse(localStorage.getItem("recipeUrl")) || [];

    //If the new recipe URL isn't already present in local storage then make a new button that is attached to the associated recipe url link and push the recipe URL and recipe title onto the end of the arrays
    if(!recipeUrlStorage.includes(recipeUrl)){
        recipeTitleStorage.push(recipeTitle);
        recipeUrlStorage.push(recipeUrl)
        var recipeTitleHistoryEl = document.createElement("button");
        //create an a tag to hold the recipe URL
        var recipeUrlEl = document.createElement("a");
        //create a blank target to open the recipe in a new tab instead of redirecting from the recipe box page
        recipeUrlEl.target = "_blank";
        recipeUrlEl.href = recipeUrl;
        recipeUrlEl.appendChild(recipeTitleHistoryEl);
        recipeTitleHistoryEl.textContent = recipeTitle;
        //classes that the button needs
        recipeTitleHistoryEl.classList = "uk-button uk-button-default saved-recipe-button";
        saveRecipeContainerEl.appendChild(recipeUrlEl);
    };

    //Store the new array with any additional recipe titles and urls in local storage
    localStorage.setItem("recipeTitle", JSON.stringify(recipeTitleStorage));
    localStorage.setItem("recipeUrl", JSON.stringify(recipeUrlStorage));
});


//Populate the recipe history buttons through page reload
window.addEventListener("load", function(){
    //Pull the local storage recipe titles and urls and store them as an array
    var recipeUrlReload = JSON.parse(localStorage.getItem("recipeUrl")) || [];
    var recipeTitleReload = JSON.parse(localStorage.getItem("recipeTitle")) || [];

    //Go through each of the recipe titles and urls in the arrays and create a button with the url as an a tag and the recipe title as the text content of the button
    for(var i=0; i<recipeUrlReload.length; i++){
        var recipeTitleHistoryEl = document.createElement("button");
        var recipeUrlEl = document.createElement("a");
        recipeUrlEl.target = "_blank";
        recipeUrlEl.href = recipeUrlReload[i];
        recipeUrlEl.appendChild(recipeTitleHistoryEl);
        recipeTitleHistoryEl.textContent = recipeTitleReload[i];
        //classes that the button needs
        recipeTitleHistoryEl.classList = "uk-button uk-button-default";
        //determine where the saved buttons are going
        saveRecipeContainerEl.appendChild(recipeUrlEl);
    };

});

//Create a clear recipe history button that the user can use to clear out their local storage and all the associated history buttons
var clearRecipeHistoryEl = document.querySelector(".clear-recipe-history");
clearRecipeHistoryEl.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.clear();
    window.location.reload();
});

