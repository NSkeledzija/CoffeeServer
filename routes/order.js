var express = require('express');
var sessionUtils = require('../custom_modules/session-utils.js');

module.exports.autoroute = {
	get: {
		'/order' : [sessionUtils.requireLogin, get]
	}
}

/* GET dashboard */
function get(req,res) {
	console.log('Router works');
	res.render('order');
}