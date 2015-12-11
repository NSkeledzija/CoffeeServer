var express = require('express');
var router = express.Router();
var database = require('../source/database-access')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Kavice' });
});

/* GET home page. */
router.post('/', function(req, res, next) {
	database.findUser(req.body.email, function(user){
		if(user){
			if(req.body.password === user.password){
				console.log('OMG login works!');
				req.session.user = user;
				res.redirect('/dashboard');
			} else {
				console.log('Fake login!');
				res.redirect('/login');
			}
		} else {
			console.log('User not found!');
		}
	});
});


module.exports = router;
