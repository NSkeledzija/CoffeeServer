var express = require('express');
var router = express.Router();

module.exports.autoroute = {
	get: {
		'/logout' : get
	}
}

/* GET logout page. */
function get(req,res) {
  req.session.destroy();
  res.redirect('/login');
}
