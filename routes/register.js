var express = require('express');
var router = express.Router();
var database = require('../source/database-access');

/* GET registration page. */
router.get('/', function(req, res, next) {
	res.render('register', { title: 'Kavice' });
});

/* POST registration page. */
router.post('/', function(req, res, next){
	database.addUser({firstName:req.body.firstName, lastName:req.body.lastName, email:req.body.email, password:req.body.password}, function(error){
		if(error){
			if(error.userAlreadyRegistered){
				console.log('This email is already registered!');
				res.redirect('/register');
			} else {
				console.log('Database error!');
				res.redirect('/register');
			}
		}else{
			console.log('Successfully added user: ' + req.body.email);
			res.redirect('/dashboard');
		}
	});	
});

module.exports = router;