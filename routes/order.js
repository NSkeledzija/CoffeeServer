var express = require('express');
var sessionUtils = require('../custom_modules/session-utils.js');

module.exports.autoroute = {
	get: {
		'/order' : [sessionUtils.requireLogin, get]
	},
	post: {
		'/order' : [sessionUtils.requireLogin, post]
	}
}

/* GET orders page */
function get(req,res) {
	console.log('Router works');
	res.render('order');
}


/* POST order */
function post(req,res) {
	res.render('dashboard', {message: 'Order submitted successfully!'});
}