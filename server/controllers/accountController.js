var http = require('http')
var request = require('request')
var User = require('../models/user')
var Account = require('../models/account')
var myLogClass = require('../utils/logger')
var logger = new myLogClass()
var passport = require('passport')
var request = require('request');

exports.createAccount = function (req, res) {
  // obtengo el usuario del parametro y reviso si tiene el mismo token
  User.findOne({
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
    Account.find({ User: user, type: 'facebook' }, function (error, accounts) {
      if (accounts.length == 0) {
        // El usuario no tenia una cuenta de facebook
        var newAccount = new Account()
        newAccount.type = 'facebook'
        newAccount.User = user
        newAccount.facebook_id = req.body.facebook_id
        newAccount.save(function (error, account) {
          if (error) {
            logger.error('Ocurrio un error al guardar la cuenta')
            logger.error(error)
          }
          return res.status(200).json({
            message: 'Cuenta añadida correctamente',
            data: account
          })
        })
      } else {
        return res.status(200).json({
          message: 'Cuenta ya existente',
          data: accounts[0]
        })
      }
    })
  })
}

exports.getAccounts = function (req, res) {
  Account.find({ User: req.params.user }, function (error, accounts) {
    if (error) {
      logger.error('Ocurrio un error al traer las cuentas')
      logger.error(error)
    }
    return res.status(200).json({data: accounts})
  })
}

exports.getTwitters = function (req, res) {
  var Twitter = require('twitter');

  Account.find({ type: "twitter", User: req.params.user }, function (error, accounts) {
    if (error) {
      logger.error('Ocurrio un error al buscar la cuenta')
      logger.error(error)
    }
    let cuenta = accounts[0]
    var client = new Twitter({
      consumer_key: 'NFdRuIMvNyR0zSYm8Fb8marg4',
      consumer_secret: 'bCy8SzLFS1Iyvzep95QFx9oqVFalEcVje2cgREVZNL9oHM9iVq',
      access_token_key: cuenta.access_token,
      access_token_secret: cuenta.access_token_secret
    });

    var params = { user_id: cuenta.profile_id };
    client.get('statuses/home_timeline', params, function (error, tweets, response) {
      console.log(error);
      if (!error) {
        return res.json({ data: tweets });
      }
    });
  })
}