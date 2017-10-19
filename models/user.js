// model for mongoose to handle; Schema is what we use to tell mongoose about the particular fields our models will have
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define model; unique ensures that only a new/unique email will save
const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String
});

//On Save Hook, encrypt password
//Before saving a model, run this function (that is what .pre is)
userSchema.pre('save', function(next) {

  //get access to user model; instance of user model
  const user = this;

  //use bcrypt library; generate a salt, take time then run callback
  //after salt is created
  bcrypt.genSalt(10,function(err, salt) {
    if(err) { return next(err); }

    //hast (aka encrypt) our password using salt
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) { return next(err); }

      //overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  //this.password refers to our hashed/salted password
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }

    callback(null, isMatch);
  });
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
