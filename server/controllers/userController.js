var http = require('http')
var request = require('request')

exports.listUsers = function (req, res) {
  res.status(200).json({
    users: []
  })
}
