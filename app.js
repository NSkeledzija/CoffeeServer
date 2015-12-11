var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessions = require('client-sessions');

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var dashboard = require('./routes/dashboard');
var users = require('./routes/users');

var app = express();

var dbAccess = require('./source/database-access');
var user = require('./source/user');

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
  secret: 'apsodkpoaskdpoajpidjiewjri1oiu4080r9udsapxos3',
}));

app.use('/login', login);
app.use('/register', register);
app.use('/dashboard', dashboard);
app.use('/', index);

var me = new user('Niksa','Skeledzija','peder@ga.com','gej');
dbAccess.addUser(me,function(error){
  if(error){
    if(error.userAlreadyRegistered){
      console.log('Fuck you user!');
    }
  } else {
    console.log('Successfully added user: ' + me.Email);
  }
});

dbAccess.findUser(me.Email,function(user){
  console.log(user);
});

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