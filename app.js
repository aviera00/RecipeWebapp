var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const recipes = require('./models/Recipe');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');


//dotenv.config({ path: '.env.example' });
dotenv.config({ path: '.env' });

var app = express();

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
mongoose.connection.on('connected', () => {
  console.log('Mongoose is connected!!! DATA BASE IS ON');
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);



app.get('/allrecipes', function(req,res){
  /*recipes.find({}, function(err, recipes) {
   if (err) throw err;
   // object of all the users
   res.render('recipes',
   {
     title: 'Home'
    });
  });*/
  res.render('recipes', {
    title: 'Home'
  });
}); 

app.get('/search', function(req,res){
  /*recipes.find({}, function(err, recipes) {
   if (err) throw err;
   // object of all the users
   res.render('recipes',
   {
     title: 'Home'
    });
  });*/
  res.render('search', {
    title: 'Home'
  });
}); 

app.get('/login', function(req,res){
  res.render('login', {
    title: 'Home'
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
