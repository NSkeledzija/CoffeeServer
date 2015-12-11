var express = require('express');
var router = express.Router();
var session = require('../source/session-utils.js');

/* GET dashboard */
router.get('/', function(req, res, next) {
	console.log(req.session);
	session.check(req.session, function(sessionValid) {
		if(sessionValid){
			res.render('dashboard',{title: 'Kavice', user: req.session.user});
		} else {
			res.redirect('/login');
		}
	});
});

module.exports = router;