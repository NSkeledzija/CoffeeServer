var express = require('express');
var session = require('../custom_modules/session-utils.js');

module.exports.autoroute = {
	get: {
		'/' : get
	}
};

/* GET home page. */
function get(req, res) {
	console.log('Index GET');
	if(req.user){
		res.redirect('/dashboard');
	} else {
		res.render('index',{title: 'Kavice'});	
	}
}