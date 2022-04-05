



var recipeCardContainerEl = document.querySelector("recipe-card-container");
var recipeCardEl = document.querySelectorAll("recipe-card");
//function to display the fivedayforecast 
function displaySummaryRecipeCards(repos){

    //Clear out five day forecast cards
    for(var i=0; i<recipeCardEl.length; i++){
        recipeCardEl[i].innerHTML = "";
    };

    //if there are no repos found then display text to reflect
    if(repos.length === 0){
        recipeCardContainerEl.textContent = "No repositories found - Please check your city name";
        return;
    };

    //Starting at index 1 within the daily weather portion of the repository because index 0 is the current weather which is already displayed above
    //Run through index 6 to get 5 days of weather
    for(var i=0; i<5; i++){

        //Gather all the necessary information for the recipe cards
        //Gather recipe title
        var recipeTitle = repos[i].label;
        //Number of servings the recipe makes
        var numberOfServings =  repos[i].yield + " Servings";
        //Number of kcal in the recipe
        var kcalCount = repos[i].calories.toFixed(1) + " kcal";
        //Protein amount in grams
        var proteinAmount = "Protein: " + repos[i].totalNutrients.procnt.quantity + " g";
        var fatAmount = "Fat: " + repos[i].totalNutrients.fat.quantity + " g";
        var carbAmount = "Carb: " + repos[i].totalNutrients.chocdf.quantity + " g";
        var imagePath = repos[i].image;

        //Create the child elements
        var baseInfoContainerEl = document.createElement('div');
        var recipeTitleEl = document.createElement('h3');
        var numberOfServingsEl = document.createElement('p');
        var kcalCountEl = document.createElement('p');

        var macroInfoContainerEl = document.createElement('div');
        var proteinAmountEl = document.createElement('p');
        var fatAmountEl = document.createElement('p');
        var carbAmountEl = document.createElement('p');

        var imageContainerEl = document.createElement('img');

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
    }

};