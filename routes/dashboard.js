var express = require('express');
var sessionUtils = require('../custom_modules/session-utils.js');

module.exports.autoroute = {
	get: {
		'/dashboard' : [sessionUtils.requireLogin, get]
	}
};

function get(req,res){
	res.render('dashboard', {User: req.user.firstName});
}


/* GET dashboard */
/*
router.get('/', sessionUtils.requireLogin, function(req, res, next) {
	res.render('dashboard');
});
 
module.exports = router;*/