//Passport used to authenticate users
const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//Set up options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
  secretOrKey: config.secret
};

//Create JWT Strategy
//payload is the decoded JWT token
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //See if the user ID in the payload exists in our database
  //If it does, call 'done' with that other
  //Otherwise, call done without a user object
  User.findById(payload.sub, function() {
    if(err) { return done(err, false); }

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//Tell passport to use this Strategy
passport.use(jwtLogin);
