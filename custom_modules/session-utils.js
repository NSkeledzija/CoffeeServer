var db = require('./database-access');

exports.processSession = function(req,res,next){
	if(req.session){
		exports.check(req.session, function(user){
			if(user){
				console.log('Session received : ' + req.session.user.email);
				req.user = user;
				delete req.user.password;
				req.session.user = req.user;
				res.locals.user = req.user;
				next();
			} else {
				req.session.destroy();
				next();
			}
		});
	} else {
		console.log('No session data receieved.');
		next();
	}
}

exports.check = function (session, callback){
	if(session){
		if(session.user){
			db.findUser(session.user.email, function(user){
				if(user){
					callback(user);
				} else {
					console.log('Unrecognized user info received : ' + session.user.email);
					callback(null);
				}
			});
		} else {
			console.log('Session without user info receieved.');
			callback(null);
		}
	} else {
		console.log('Check session called on invalid object.');
		callback(null);
	}
}

exports.requireLogin = function(req, res, next){
	if(!req.user){
		res.redirect('/login');
	} else {
		next();
	}
}
