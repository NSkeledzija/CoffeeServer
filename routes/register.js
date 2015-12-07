var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

/* GET registration page. */
router.get('/', function(req, res, next) {
	res.render('register', { title: 'Kavice' });
});

/* POST registration page. */
router.post('/', function(req, res, next){
	var db = new sqlite3.Database('./database',function(){
		console.log(db);
		// Check if the user already exists in the database
		var searchQuery = 'SELECT email FROM users WHERE email = \'' + req.body.email + '\'';
		console.log(searchQuery);
		db.get(searchQuery, function(err, row){
			if(row === undefined){
				var insertQuery = 'INSERT INTO users (FirstName, LastName, Email, Password) VALUES (\'' + req.body.firstName + '\',\'' 
					+ req.body.lastName + '\',\'' + req.body.email + '\',\'' + req.body.password + '\')';
				console.log(insertQuery);
				
				db.run(insertQuery, function(err){
					if(!err){
						console.log('Successfully added user: ' + req.body.email);
						res.redirect('/dashboard');
					}else{
						console.log("Error : " + err);
					}
				});
			}else{
				console.log('The email is already registered!');
			}
		});
	});
});

module.exports = router;