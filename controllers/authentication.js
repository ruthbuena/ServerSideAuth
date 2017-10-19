exports.signup = function(req, res, next) {
  // console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  //See if a user with a given email exists


  //If a user with an email does exist, return an error


  //If a user with email does NOT exist, create and save user record


  //Respond to request indicating the user was created


}
