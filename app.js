/* Coffee server, 2015 */

// Node module dependencies

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessions = require('client-sessions');

// Custom modules
var sessionUtils = require('./custom_modules/session-utils');

// Routes
var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var dashboard = require('./routes/dashboard');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals.pretty = true;

 // uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessions({
  cookieName: 'session',
  secret: 'pasodkpasdasdas',
  duration: 1 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5, 
}));

app.use(sessionUtils.processSession);

app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/dashboard', dashboard);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000);

module.exports = app;