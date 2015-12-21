var express = require('express');
var router = express.Router();
var database = require('../custom_modules/database-access');
var bcrypt = require('bcrypt-nodejs');

/* GET registration page. */
router.get('/', function(req, res, next) {
	res.render('register', { title: 'Kavice' });
});

/* POST registration page. */
router.post('/', function(req, res, next){
	var passwordHash = bcrypt.hashSync(req.body.password);
	console.log(req.body.password);
	console.log(passwordHash);
	
	var user = {firstName:req.body.firstName, lastName:req.body.lastName, email:req.body.email, password:passwordHash}; 
	database.addUser(user,function(err){
		if(!err){
			req.session.user = user;
			res.redirect('/dashboard');
		} else if(err.alreadyRegistered){
			res.render('register', {title: 'Kavice', error: 'The email entered is already registered. Please use a different email'});
		}else{
			res.render('register', {title: 'Kavice', error: 'Database insertion failed. Contact admin.'});
		}
	});	
});

module.exports = router;