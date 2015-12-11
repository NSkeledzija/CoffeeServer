var express = require('express');
var router = express.Router();
var session = require('../source/session-utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.session);
	session.check(req.session, function(sessionValid){
		if(sessionValid){
			res.redirect('/dashboard');
		} else {
			res.render('index',{title: 'Kavice'});
		}
	});
});

module.exports = router;