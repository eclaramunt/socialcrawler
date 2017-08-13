var http = require('http')
var request = require('request')
var User = require('../models/user')
var Account = require('../models/account')
var myLogClass = require('../utils/logger')
var logger = new myLogClass()

exports.createAccount = function (req, res) {
  // obtengo el usuario del parametro y reviso si tiene el mismo token
  User.find({
    _id: req.params.user
  }, function (error, user) {
    if (error) {
      logger.fatal('Ocurrio un error al buscar el usuario')
      logger.fatal(error)
      res.status(401).json({
        message: 'Ocurrio un error al buscar el usuario'
      })
    }
    if (!user) {
      logger.fatal('No se encontro al usuario para añadir la cuenta')
      res.status(401).json({
        message: 'Usuario no encontrado'
      })
    }
    // obtenido el usuario, verifico si ya tiene una cuenta
    Account
    return res.json({
      message: 'Cuenta agregada correctamente'
    })
  })
}

exports.getAccounts = function (req, res) {
  Account.find({User: req.body.user}, function (error, accounts) {
    if (error) {
      logger.error('Ocurrio un error al traer las cuentas')
      logger.error(error)
    }
    return res.status(200).json({data: accounts})
  })
}
