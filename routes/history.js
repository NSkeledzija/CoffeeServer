var express = require('express');
var sessionUtils = require('../custom_modules/session-utils.js');


module.exports.autoroute = {
	get: {
		'/history' : [sessionUtils.requireLogin, get]
	}
};

/* GET dashboard */
function get(req, res) {
	res.render('history');
}