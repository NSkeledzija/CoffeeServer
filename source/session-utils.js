var db = require('./database-access');

exports.check = function (session, callback){
	if(session && session.user){
		db.findUser(session.user, function(user){
			if(user){
				if(user.password === session.user.password){
					callback(true);
				} else {
					callback(false);
				}
			} else {
				callback(false);
			}
		});
	} else {
		callback(false);
	}
}

