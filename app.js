var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
require("./public/db/db")


var indexRouter = require('./routes/userRoute');
var usersRouter = require('./routes/blogRoutes');

var app = express();




app.use(logger('dev'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

 
app.use('/', indexRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}




module.exports = app;
