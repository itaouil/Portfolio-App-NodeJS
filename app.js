// Modules
var express       = require('express');
var path          = require('path');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var validator     = require('express-validator');
var flash         = require('connect-flash');
var session       = require('express-session');
var mysql         = require('mysql');
var moment        = require('moment');
var multer        = require('multer');
var upload        = multer({ dest: 'public/img/portfolio' });

// Routes modules
var index = require('./routes/index');
var admin = require('./routes/admin');

// Express app
var app = express();

// Handlebars View Set Up
app.set('views', path.join(__dirname, 'views'));
app.set('view options', { layout: 'layouts/main' });
app.set('view engine', 'hbs');

// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routs middleware
app.use('/', index);
app.use('/admin', admin);

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
