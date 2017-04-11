// import the necessary modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define schema
var UserSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('User', UserSchema);