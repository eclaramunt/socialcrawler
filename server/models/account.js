// import the necessary modules
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// define schema
var AccountSchema = new Schema({
  name: String,
  descripcion: String,
  type: String
});

module.exports = mongoose.model('Account', AccountSchema);
