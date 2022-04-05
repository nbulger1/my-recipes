var searchButtonEl = document.getElementById("search-button");
var searchTermEl = document.getElementById("keyword-text") //e.g Chicken
var recipeSearchAppID = "d2a0908b";
var recipeSearchAppKey = "6a95aab79ad4dec19b99622d9625382e";
var healthLabelEl = document.getElementById("health-label"); //e.g alcohol free, celery free etc.
var cuisineTypeEl = document.getElementById("cuisine-type");//asian, american etc.
var mealTypeEl = document.getElementById("meal-type"); //dinner, lunch etc.

function getApi(event) {
    //Use this when submitting form so that it prevents a full page refresh which clears the console.
    event.preventDefault();
    console.log("click");

    var searchTermValue = searchTermEl.value.trim();
    var healthLabelValue = ""; //TODO change to dynamic drop down value
    var cuisineTypeValue = "America" ; //TODO change to dynamic drop down value
    var mealTypeValue = "Dinner"; //TODO change to dynamic drop down value


    recipeSearchUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTermValue}&app_id=${recipeSearchAppID}&app_key=${recipeSearchAppKey}&health=${healthLabelValue}&cuisineType=${cuisineTypeValue}&mealType=${mealTypeValue}&imageSize=REGULAR`
    //https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=d2a0908b&app_key=6a95aab79ad4dec19b99622d9625382e&health=alcohol-free&cuisineType=Asian&mealType=Dinner&imageSize=REGULAR

  fetch(recipeSearchUrl)
    .then(function (response) {
       // console.log(response.json());
      return response.json();
    }) 
    .then(function(data) {

        console.log(data);  
    })  
}

searchButtonEl.addEventListener('click', getApi);

// var recipeCardContainerEl = document.querySelector(".recipe-card-container");
// var recipeCardEl = document.querySelectorAll(".recipe-card");
// //function to display the fivedayforecast 
// function displaySummaryRecipeCards(repos){

//     //Clear out five day forecast cards
//     for(var i=0; i<recipeCardEl.length; i++){
//         recipeCardEl[i].innerHTML = "";
//     };

//     //if there are no repos found then display text to reflect
//     if(repos.length === 0){
//         recipeCardContainerEl.textContent = "No repositories found - Please check your city name";
//         return;
//     };

//     //Starting at index 1 within the daily weather portion of the repository because index 0 is the current weather which is already displayed above
//     //Run through index 6 to get 5 days of weather
//     for(var i=0; i<5; i++){

//         //Gather all the necessary information for the recipe cards
//         //Gather recipe title
//         var recipeTitle = repos.hits[i].recipe.label;
//         //Number of servings the recipe makes
//         var numberOfServings =  repos.hits[i].recipe.yield + " Servings";
//         //Number of kcal in the recipe
//         var kcalCount = repos.hits[i].recipe.calories.toFixed(1) + " kcal";
//         //Protein amount in grams
//         var proteinAmount = "Protein: " + repos.hits[i].recipe.totalNutrients.PROCNT.quantity.toFixed(1) + " g";
//         var fatAmount = "Fat: " + repos.hits[i].recipe.totalNutrients.FAT.quantity.toFixed(1) + " g";
//         var carbAmount = "Carb: " + repos.hits[i].recipe.totalNutrients.CHOCDF.quantity.toFixed(1) + " g";
//         var imagePath = repos.hits[i].recipe.image;

//         //Create the child elements
//         var baseInfoContainerEl = document.createElement('div');
//         baseInfoContainerEl.classList.add("recipe-card-info");
//         var recipeTitleEl = document.createElement('h3');
//         var numberOfServingsEl = document.createElement('p');
//         var kcalCountEl = document.createElement('p');

//         var macroInfoContainerEl = document.createElement('div');
//         macroInfoContainerEl.classList.add("recipe-card-info");
//         var proteinAmountEl = document.createElement('p');
//         var fatAmountEl = document.createElement('p');
//         var carbAmountEl = document.createElement('p');

//         var imageContainerEl = document.createElement('img');
//         imageContainerEl.classList.add("recipe-card-info");

//         //Apply the text content using the gathered information and child elements
//         recipeTitleEl.textContent = recipeTitle;
//         numberOfServingsEl.textContent = numberOfServings;
//         kcalCountEl.textContent = kcalCount;

//         proteinAmountEl.textContent = proteinAmount;
//         fatAmountEl.textContent = fatAmount;
//         carbAmountEl.textContent = carbAmount;

//         imageContainerEl.setAttribute("src", imagePath);

//         baseInfoContainerEl.appendChild(recipeTitleEl);
//         baseInfoContainerEl.appendChild(numberOfServingsEl);
//         baseInfoContainerEl.appendChild(kcalCountEl);

//         macroInfoContainerEl.appendChild(proteinAmountEl);
//         macroInfoContainerEl.appendChild(fatAmountEl);
//         macroInfoContainerEl.appendChild(carbAmountEl);

//         recipeCardEl[i].appendChild(baseInfoContainerEl);
//         recipeCardEl[i].appendChild(macroInfoContainerEl);
//         recipeCardEl[i].appendChild(imageContainerEl);

//     }

// };

// recipeCardContainerEl.addEventListener("click", function(event){
//     var recipeIndex = event.target.getAttribute("data-index");
//     displayChosenRecipeCard(recipeIndex);
// });

// function displayChosenRecipeCard(recipeIndex) {

// }
