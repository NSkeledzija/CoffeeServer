var express = require('express');
var sessionUtils = require('../custom_modules/session-utils.js');

module.exports.autoroute = {
	get: {
		'/account' : [sessionUtils.requireLogin, get]
	}
};

/* GET account */
function get(req, res) {
	res.render('account');
}

