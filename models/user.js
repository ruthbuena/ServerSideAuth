// model for mongoose to handle; Schema is what we use to tell mongoose about the particular fields our models will have
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define model; unique ensures that only a new/unique email will save
const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String
});

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
