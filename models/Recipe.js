const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const recipeSchema = new mongoose.Schema({
    recipeID:{
        type: String,
        //required: true
    }, 
    recipeTitle: {
        type: String,
       // required: true
    },
    recipeIngredients: {
        type: String,
        //required: true
    },
    recipeBody: {
        type: String,
        //required: true
    },
    recipeDate:{
        type: String,
        default: Date.now()
    }
 });


 const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    Date:{
        type: String,
        default: Date.now()
    }
 });

const User = mongoose.model('User', userSchema);

module.exports = User;
