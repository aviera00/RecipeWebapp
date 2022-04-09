
/////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////
var api = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=961bca43e1a24c64bc25c4eea7f68597&query=';
var searchKey = 'pizza';
var endPath = '&number=5';
var input;




var button = document.getElementById("search");
button.onclick = function(){
  console.log("hello");
  recipeSearch();
}
 //input = select('#searchBar');

function recipeSearch(){


  const recipeList = document.getElementById('recipeList');
  const searchBar = document.getElementById('searchBar');
  let apiRecipes = [];
  var searchString;
  console.log(searchBar.value)
  var URL = api+searchBar.value+endPath;
  console.log(URL);
  fetch(URL)
      .then((response) => response.json())
      .then(function(recipes) 
      {
        var final = [];
        for(i in recipes)
        {
          for(j in recipes[i])
          {
            console.log(recipes[i][j]);
            final.push([recipes[i][j].title, recipes[i][j].image, recipes[i][j].id, recipes[i][j].sourceUrl]);
          }
          /*console.log(recipes[i]);
          console.log(recipes[i][1]);
          console.log(recipes[i][0].title);*/
          
        }
        //recieves data from previous promise, adds link and comment karma to the final array and 
          for(k in final)
          {
            var imgId = "recipeimg" + k;
            var linkId = "link" + k;
            var nameId = "demo" + k
            //document.getElementById(buttonId).onlick = newLocation;
            document.getElementById(imgId).src = final[k][1];
            document.getElementById(linkId).setAttribute("href", final[k][3]);
            document.getElementById(nameId).innerHTML = final[k][0];
          }

          

          /*document.getElementById("demo1").innerHTML= final[1][0]; 
          document.getElementById("recipeimg1").src = final[1][1];*/
      });











  /*
  searchBar.addEventListener('keyup', (e) => {
       searchString = e.target.value.toLowerCase();
  
       console.log('This is whats in the search bar');
       console.log(searchString);
       console.log('AFTER SEARCH STRING');

      const filteredRecipes = apiRecipes.filter((recipes) => {
          return (
              recipes.name.toLowerCase().includes(searchString) ||
              recipes.house.toLowerCase().includes(searchString)
          );
      });

      displayRecipes(filteredRecipes);
  });
  */


  /*
  const loadRecipes = async () => {
    console.log('AN ATTEMPT TO LOAD RECIPES HAS BEEN MADE');
      try {
          var URL = api+searchBar.value+endPath;
          console.log('This is the URL!!!!');
          console.log(URL);
          const res = await fetch(URL);
          apiRecipes = await res.json();
          console.log('THESE ARE THE API RECIPES');
          console.log(apiRecipes);
          displayRecipes(apiRecipes);
      } catch (err) {
          console.error(err);
      }
  };
  
  const displayRecipes = (apiRecipes) => {
      const htmlString = apiRecipes.map((recipe) => {
              return `
              <li class="recipe">
                  <h2>${recipe.title}</h2>
                  <p>id: ${recipe.id}</p>
                  <img src="${recipe.image}"></img>
              </li>
          `;
          })
          .join('');
      recipeList.innerHTML = htmlString;
  };
  
  loadRecipes();
*/



}