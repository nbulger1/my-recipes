var pEl = document.getElementById("test");
var searchTermEl //e.g Chicken
var recipeSearchAppID = "d2a0908b";
var recipeSearchAppKey = "6a95aab79ad4dec19b99622d9625382e";
var healthLabelEl //e.g alcohol free, celery free etc.
var cuisineTypeEl //asian, american etc.
var mealTypeEl //dinner, lunch etc.


function getApi(event) {
    //Use this when submitting form so that it prevents a full page refresh which clears the console.
    event.preventDefault();
    console.log("click");

    recipeSearchUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${recipeSearchAppID}&app_key=${recipeSearchAppKey}&health=${healthLabelEl}&cuisineType=${cuisineTypeEl}&mealType=${mealTypeEl}&imageSize=REGULAR`
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

pEl.addEventListener('click', getApi);
