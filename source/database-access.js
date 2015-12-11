var sqlite3 = require('sqlite3');

exports.addUser = function (user, callback){
	var db = new sqlite3.Database('./database',function(){
		//console.log(user);
		// Check if the user already exists in the database
		var searchQuery = 'SELECT email FROM users WHERE email = \'' + user.email + '\'';
		//console.log(searchQuery);
		db.get(searchQuery, function(err, row){
			if(row === undefined){
				var insertQuery = 'INSERT INTO users (FirstName, LastName, Email, Password) VALUES (\'' + user.firstName + '\',\'' 
					+ user.lastName + '\',\'' + user.email + '\',\'' + user.password + '\')';
				//console.log(insertQuery);
				
				db.run(insertQuery, function(err){
					if(!err){
						if(!(callback == undefined))
							callback(null);
					}else{
						if(!(callback == undefined))
							callback({databaseError:true});
					}
				});
			}else{
				if(!(callback == undefined))
					callback({userAlreadyRegistered:true});
			}
		});
	});
}

exports.findUser = function(email, callback){
	var db = new sqlite3.Database('./database',function(){
		//console.log(db);
		// Check if the user already exists in the database
		var searchQuery = 'SELECT * FROM users WHERE email = \'' + email + '\'';
		//console.log(searchQuery);
		db.get(searchQuery, function(err, row){
			if(!(row === undefined)){
				if(!(callback == undefined))
					callback({firstName:row.FirstName, lastName:row.LastName, email:row.Email, password:row.Password});
			}else{
				if(!(callback == undefined))
					callback(null);
			}
		});
	});
}