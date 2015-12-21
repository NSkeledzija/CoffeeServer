var express = require('express');
var router = express.Router();
var session = require('../custom_modules/session-utils.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user){
		res.redirect('/dashboard');
	} else {
		res.render('index',{title: 'Kavice'});	
	}
});

module.exports = router;