var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var User = require("../models/user.js");
var configAuth = require("./auth.js");

module.exports = function(passport){

  passport.serializeUser(function(user,done){
    done(null,user.id);
  });

  passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

  passport.use(new GoogleStrategy({
    clientID        : configAuth.googleAuth.clientID,
    clientSecret    : configAuth.googleAuth.clientSecret,
    callbackURL     : configAuth.googleAuth.callbackURL,
  },
  function(token,refreshToken,profile,done){
    //this makes sure that the function executes only when info is returned.
    process.nextTick(function(){

      User.findOne({'google.id' : profile.id},function(err,user){
        if(err){
          return done(err);
        }
        if(user){
          console.log("existing user logging in");
          return done(null,user);
        }
        else{
          var new_user = new User();
          console.log(profile.id,"hi");
          new_user.google.id = profile.id;
          new_user.google.token = token;
          new_user.google.email = profile.emails[0].value;
          new_user.google.name = profile.displayName;
          new_user.played = [];
          console.log("new user being created");
          new_user.save(function(err){
            if(err){
              console.log("not");
              throw err;
            }
            else{
              done(null, new_user);
            }
          });
        }
      });
    });
  }
));
}
