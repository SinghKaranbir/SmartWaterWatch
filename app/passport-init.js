var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
//temporary data store
var users = {};
module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
	passport.serializeUser(function(user, done) {
		console.log('serializing user:',user.username);
		//return the unique id for the user
		done(null, user.username);
	});

	//Desieralize user will call with the unique id provided by serializeuser
	passport.deserializeUser(function(username, done) {

		return done(null, users[username]);

	});

	passport.use('login', new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) { 

			if(!users[username]){
				console.log('User Not Found with username '+username);
				return done(null, false,"Username not found");
			}

			if(!isValidPassword(users[username], password)){
				
				return done(null, false," Invalid password");
			}
			
				// Authenticated user
				return done(null, users[username]);
			
		})
	);

	passport.use('signup', new LocalStrategy({
			passReqToCallback : true // allows us to pass back the entire request to the callback
		},
		function(req, username, password, done) {

			if (users[username]){
				
				return done(null, false, "Username already taken");
			}
	
			//store user in memory 
			users[username] = {
				username: username,
				password: createHash(password)
			}
			
			console.log(users[username].username + ' Registration successful');
			return done(null, users[username]);
		})
	);
	
	var isValidPassword = function(user, password){
		return bCrypt.compareSync(password, user.password);
	};
	// Generates hash using bCrypt
	var createHash = function(password){
		return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
	};

};
