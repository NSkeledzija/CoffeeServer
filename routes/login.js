var express = require('express');
var router = express.Router();
var database = require('../custom_modules/database-access');
var bcrypt = require('bcrypt-nodejs');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Kavice' });
});

/* POST login form */
router.post('/', function(req, res, next) {
	database.findUser(req.body.email, function(user){
		if(user){
			if(bcrypt.compareSync(req.body.password, user.password)){
				req.session.user = user;
				res.redirect('/dashboard');
			} else {
				res.render('login',{error: "Invalid user name or password!"});
			}
		} else {
			res.render('login',{error: "Invalid user name or password!"});
		}
	});
});


module.exports = router;
