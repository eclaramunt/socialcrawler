var http = require('http')
var request = require('request')
var User = require('../models/user')
var Account = require('../models/account')
var myLogClass = require('../utils/logger')
var logger = new myLogClass()

exports.createAccount = function (req, res) {
  console.log(req.params.user)
  console.log(req.params)
}

exports.getAccounts = function (req, res) {
  return res.status(200).json({data: []})
}
