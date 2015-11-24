var mongoose = require('mongoose');   
var User = mongoose.model('User');
var LocalStrategy   = require('passport-local').Strategy;


module.exports = function(passport){

  // Passport needs to be able to serialize and deserialize users to support persistent login sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) { 
      // check in mongo if a user with username exists or not
      User.findOne({ 'email' :  email }, 
        function(err, user) {
          // In case of any error, return using the done method
          if (err)
            return done(err);
          // Username does not exist, log the error and redirect back
          if (!user){
            console.log('User Not Found with username '+ req.body.firstName);
            return done(null, false, {message: 'Incorrect email.'});
          }
          // User exists but wrong password, log the error
          user.comparePassword(password, function(err, isMatch){
            if(isMatch){
              return done(null,user);
            }else{
              return done(null,false, {message: 'Incorrect Password'});
            }
          });
        });
    }));

  /*passport.use('signup', new LocalStrategy({

     // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

      // find a user in mongo with provided username
      User.findOne({ 'email' :  email }, function(err, user) {
        // In case of any error, return using the done method
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists with username: '+ req.body.firstName);
          return done(null, false);
        } else {
          // if there is no user, create the user
          var newUser = new User();

          // set the user's local credentials
          newUser.email = email;
          newUser.password = createHash(password);
          newUser.firstName = req.body.firstName;
          newUser.lastName = req.body.lastName;
          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            console.log(newUser.firstName + ' Registration succesful');    
            return done(null, newUser);
          });
        }
      });
    })
  );*/
  
 /* var isValidPassword = function(user, password){
    return bCrypt.compareSync(password, user.password);
  };
  // Generates hash using bCrypt
  var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };*/

};