var express = require('express');
var router = express.Router();
var sessionUtils = require('../custom_modules/session-utils.js');

/* GET dashboard */
router.get('/', sessionUtils.requireLogin, function(req, res, next) {
	res.render('dashboard');
});

module.exports = router;