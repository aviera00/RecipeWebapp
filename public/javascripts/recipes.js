window.onload = function () {

  /*function addHTML(text)
  {
    //Grab the container div
    var start_div = document.getElementById('start');
    //make a new Div element
    var newElement = document.createElement('div');
    //add text to that div
    newElement.innerHTML = text;
    //append it to the main 
    start_div.appendChild(newElement);
  }*/
  fetch("https://api.spoonacular.com/recipes/random?apiKey=961bca43e1a24c64bc25c4eea7f68597&number=3")
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


}




