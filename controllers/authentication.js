const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

//jwt is a standard convention that has a sub aka subject; here we say sub is this specific user
//also add timestamp for additional layer of when user signed up
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function (req, res, next) {
  //User has already had their email and PW authorized we just need to give them a tokenForUser
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  //error will load if no email or no password is entered !email !password
  if(!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password '});
  }

  //See if a user with a given email exists; findOne is method used as search criteria
User.findOne({ email: email }, function(err, existingUser){
  if(err) { return next(err); }

  //If a user with an email does exist, return an error
  //status 422 is unprocessed entity;user already exists
  if(existingUser) {
      return res.status(422).send({ error: 'Email is in use'});
  }

  //If a user with email does NOT exist, create and save user record
  const user = new User ({
    email: email,
    password: password
  });

//This will save user to the DB; this will take some time so we want to pass a callback in to see if this has been saved
  user.save(function(err) {
    if(err) { return next(err); }


  //Respond to request indicating the user was created
  // res.json(user) - removed this so that user pw doesn't show up
  res.json({ token: tokenForUser(user) });
});
});
}
