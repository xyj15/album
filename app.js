var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var album=require('./routes/album');
var friend=require('./routes/friend');
var home=require('./routes/home');
var register=require('./routes/register');
var onephoto=require('./routes/onephoto');
var photo=require('./routes/photo');
var upload=require('./routes/upload');
var hot=require('./routes/hot');
var activity=require('./routes/activity');
var myactivity=require('./routes/myactivity');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/album',album);
app.use('/friend',friend);
app.use('/home',home);
app.use('/register',register);
app.use('/onephoto',onephoto);
app.use('/photo',photo);
app.use('/upload',upload);
app.use('/hot',hot);
app.use('/activity',activity);
app.use('/myactivity',myactivity);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
