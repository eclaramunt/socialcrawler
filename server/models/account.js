// import the necessary modules
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var Schema = mongoose.Schema

// define schema
var AccountSchema = new Schema({
  type: String,
  facebook_id: String,
  User: { type: Schema.ObjectId, ref: "User" },
})

module.exports = mongoose.model('Account', AccountSchema)
