var express = require('express');
var database = require('../custom_modules/database-access');
var bcrypt = require('bcrypt-nodejs');

module.exports.autoroute = {
	get: {
		'/register' : get
	}, 
	post: {
		'/register' : post
	}
};

/* GET registration page. */
function get(req, res) {
	res.render('register', { title: 'Kavice' });
}

/* POST registration page. */
function post(req, res){
	var passwordHash = bcrypt.hashSync(req.body.password);
	console.log(req.body.password);
	console.log(passwordHash);
	
	var user = {firstName:req.body.firstName, lastName:req.body.lastName, email:req.body.email, password:passwordHash}; 
	database.addUser(user,function(err){
		if(!err){
			req.session.user = user;
			res.redirect('/dashboard');
		} else if(err.alreadyRegistered){
			res.render('register', {title: 'Kavice', error: 'The email entered is already registered. Please use a different email'});
		}else{
			res.render('register', {title: 'Kavice', error: 'Database insertion failed. Contact admin.'});
		}
	});	
}
