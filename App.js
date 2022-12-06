
const apikeys = "d672acbb64558f49c8e9ee1b9b800be3" ;
const appId = 'd9bad0e2';
let searchQuery = '';

const SearchForm = document.querySelector("form"),
recipeName =  document.querySelector(".title"),
viewMoreitem =  document.querySelector('.view-btn'),
item_data = document.querySelector(".item-data");
recipeImage=  document.querySelector(".recpiImage");
const searchDiv = document.querySelector(".Search_result");


SearchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
     searchQuery = e.target.querySelector("input").value;
    FetchAPi();
    
})
async function FetchAPi(){
     const BaseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${appId}&app_key=${apikeys}&to=20`
     const response = await fetch(BaseUrl);
     const recipeData = await response.json()
     let recipeArry = recipeData.hits;
     GenaratelHmtl(recipeArry)
     console.log(recipeArry)
 }   

 function GenaratelHmtl(results){

    let  generatedHtml  = "";
    results.map((result)=>{
        let imageRecipe = result.recipe.image, 
         titlerecipe =  result.recipe.label,
         Calories  = result.recipe.calories.toFixed(2),
         VewRecipeurl = result.recipe.url,
         DietLabel = result.recipe.dietLabels,
         HelthLabel = result.recipe.healthLabels ;
        
        generatedHtml += `
                    <div class="item">
                           <img src="${imageRecipe}" alt="Food">
                           <div class="flex-container">
                                <h1 class="title">${titlerecipe}</h1>
                               <a class="view-btn" href="${VewRecipeurl}" target="_blank">View Recipe</a>
                           </div>
                               <p class="item-data">Calories : ${Calories}</p>
                               <p class="item-data">Diet Label : ${DietLabel}</p>
                               <p class="item-data">Helth Label : ${HelthLabel}</p>
                       </div>
                     `
    })
    searchDiv.innerHTML = generatedHtml ;



 }