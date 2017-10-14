var express = require('express');
var app = express();

//app.use(express.static('static'));


/**
 * Let's creat the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
  res.error = [];
  res.tpl = {};
  return next();
});

/**
 * Include all the routes
 */
//require('./routes/courses')(app);
require('./routes/outside')(app);

//Use the static MW
//app.use(express.static('static'));

/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
  res.status(500).send('Error occured! Check console.');

  //Flush out the stack to the console
  console.error(err.stack);
});

/*
app.use('/',function(req, res, next){
	next();
});*/


var server = app.listen(3000, function () {
	console.log("http://localhost:3000/");
});