var http = require('http')
var request = require('request')
var User = require('../models/user')

exports.login = function (req, res) {
  res.status(200).json({
    token: '123TOKEN'
  })
}
