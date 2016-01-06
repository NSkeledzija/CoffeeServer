var express = require('express');
var database = require('../custom_modules/database-access');
var bcrypt = require('bcrypt-nodejs');

module.exports.autoroute = {
	get: {
		'/login' : get
	}, 
	post: {
		'/login' : post
	}
};

/* GET login page. */
function get(req,res) {
	console.log('Login GET');
  	res.render('login', { title: 'Kavice' });
}

/* POST login form */
function post(req,res){
	database.findUser(req.body.email, function(user){
		if(user){
			if(bcrypt.compareSync(req.body.password, user.password)){
				req.session.user = user;
				res.redirect('/dashboard');
			} else {
				res.render('login',{error: "Invalid user name or password!"});
			}
		} else {
			res.render('login',{error: "Invalid user name or password!"});
		}
	});
}
