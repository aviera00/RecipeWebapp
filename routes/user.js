const express = require('express');
//const { post } = require('../app.js');
//const { db } = require('../models/user.js');
const User = require('../models/Recipe.js');
const router = express.Router();

const { query } = require('express');
//const { post } = require('../app.js');  // WORKS
/* GET URL Path /user/. */
router.get('/', async (req, res, next) => {
  const users = await User.find();
  if(req.query.search == null){
    try{
     // const users = await user.find();
      res.json(users);
    }catch(err){
      res.json({message:err});
    }
  }else{
    //const users = await user.find();
    const usersToPass = [];//this will be the array for users we are looking for
    var i;
    var j = 0;
    for(i = 0; i < users.length; i++){
      if(users[i].Title.includes(req.query.search) ||users[i].Body.includes(req.query.search) ){

       usersToPass[j] = users[i];//if they match(found) then add user to userToPass array
       j++;
   }
  }

  res.send(usersToPass)
  res.status(201).send();// ending request
  }
  
  
});

//const { post } = require('../app.js'); // WORKS
/* GET URL Path /user/. */
router.get('/:userID', async (req, res, next) => {
  try{
console.log(req.params.userID)
const thisUser = await user.find({userID: req.params.userID});
//let stringOfJSON = JSON.stringify(thisuser);
//let thisOBJ = JSON.parse(stringOfJSON);
//console.log(thisOBJ)
res.json(thisUser);

  }catch(err){
    res.json({message:err});
  }

});

//DELETE - /users/[userID] Works
router.delete('/:userID', async (req, res, next) => {
  try{
 const removeduser = await user.deleteOne({userID: req.params.userID});
 res.json(removeduser);
 consol.log('Successfully deleted');
      }catch(err){
        res.json({message:err});
      }
    
});



//const { post } = require('../app.js');  // WORKS
/* GET URL Path /user/. */
router.put('/:userID', async (req, res, next) => {
  try{

    const updatedPost = await user.updateOne(
      {userID: req.params.userID},
      { $set: {
      Title: req.body.Title,
      Body: req.body.Body,
      Date: req.body.Date
    }
  }
    
    );

    res.json(updatedPost);
  }catch(err){
    res.json({message:err});
  }

});

////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////ONTO recipeS
///////////////////////////////////////////////////////////////////////////////////////////////
router.get('/:userID/recipes', async (req, res, next) => {
  const usersrecipes = await user.findOne({"userID": req.params.userID});
  if(req.query.search == null){
  try{
    res.json(usersrecipes.recipes);
  }catch(err){
    res.json({message:err});
  }
  }else{
    //const usersrecipes = await user.findOne({"userID": req.params.userID});
    console.log(usersrecipes.recipes[1].recipeTitle);
    console.log(req.query.search);

    const usersrecipesToPass = [];//this will be the array for users we are looking for
    var i;
    var j = 0;
    //console.log(usersrecipes.recipes.length)
    for(i = 1; i < usersrecipes.recipes.length; i++){
      console.log('hit')
      if(usersrecipes.recipes[i].recipeTitle.includes(req.query.search) ||usersrecipes.recipes[i].recipeBody.includes(req.query.search)  ){
        console.log('hit')
        usersrecipesToPass.recipes[j] = usersrecipes.recipes[i];//if they match(found) then add user to userToPass array
       j++;
   }
   
  }
  console.log(usersrecipesToPass.recipes)
  res.send(usersrecipesToPass.recipes)
  res.status(201).send();// ending request
  }


});


// GET SPECIFIC recipe FOR SPECIFIC user
//WORKS
router.get('/:userID/recipes/:recipeID', async (req, res, next) => {
  console.log(req.params.recipeID);
  try{
    const userrecipe = await user.findOne({"userID": req.params.userID});
     
    
      for(let i = 0; i<userrecipe.recipes.length; i++) {
        if(userrecipe.recipes[i].recipeID == req.params.recipeID)
        res.json(userrecipe.recipes[i]);
      }
 
     // res.json(userrecipe);
  }catch(err){
    res.json({message:err});
  }

});

//const { post } = require('../app.js');  // WORKS
/* GET URL Path /user/. */

///updating a specific recipe
router.put('/:userID/recipes/:recipeID', async (req, res, next) => {
  try{
    const updateduserrecipe = await user.updateOne(
      { 'userID': req.params.userID, 'recipes.recipeID': req.body.recipeID}, 
      { $set: { 
          'recipes.$.recipeTitle': req.body.recipeTitle,
          'recipes.$.recipeBody': req.body.recipeBody,
          'recipes.$.recipeDate': req.body.recipeDate,

      }});
    res.json(updateduserrecipe);
  }catch(err){
    res.json({message:err});
  }

});



//DELETE - a specific recipe
router.delete('/:userID/recipes/:recipeID', async (req, res, next) => {

    const deleteduserrecipe = await user.findOneAndUpdate(
      { userID: req.params.userID },
      { $pull: { recipes: { recipeID: req.params.recipeID} } },
      { new: true }
  )
  res.json(deleteduserrecipe)

});


////////////////////////////////
//post unique user recipe

router.put('/:userID/recipes', async (req, res, next) => {
  try{
    const updateduserrecipe = await user.updateOne(
      { "userID": req.params.userID },
      { 
          "$push": {
              "recipes": {
                 // "recipeID" : req.body.recipeID,
                  "recipeTitle" : req.body.recipeTitle,
                  "recipeBody" : req.body.recipeBody,
                  "recipeDate" : req.body.recipeDate
              }
          }
      }
  );
    res.json(updatedUserRecipe);
  }catch(err){
    res.json({message:err});
  }

});




//Old code starts here


router.post('/',  function(req, res, next) {
  console.log("Hello");
const data =
{
  userID: req.body.userID,
  Bio: req.body.Bio,
  Name: req.body.Name,
  Date: req.body.Date,
  //Admin: req.body.Admin,
  recipes: [{

 }]
}
//user.updateOne({userID:  userID}, {$push: {recipes: {recipeID: req.body.recipeID, reaviewTitle: req.body.recipeTitle,recipeBody: req.body.recipeBody, recipeDate: req.body.recipeDate }}});
const newUser = new User(data);
/////
let stringOfJSON = JSON.stringify(newUser);
let thisOBJ = JSON.parse(stringOfJSON);
console.log(thisOBJ)

newUser.save((error)=> {
if(error){
  console.log('Didnt save properly')
}else{
  console.log('Data has been saved, new user has been posted')
  res.status(201).send();
}
});


});


module.exports = router;
