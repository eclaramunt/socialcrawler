var http = require('http')
var request = require('request')
var bCrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var User = require('../models/user')

var myLogClass = require('../utils/logger');
var logger = new myLogClass();

var config = require("../config");

function jwt_gen() {
  var seed = config.Auth.key_seed + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  return bCrypt.hashSync(seed, false);
}

exports.login = function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({
      error: "Ingrese usuario y contraseña"
    });
  }
  User.findOne({email: req.body.email}, function (error, user) {
    if (error) {
      logger.error('Ocurrio un error al buscar los usuarios')
      logger.error(error)
      return next(error);
    }

    if (!user) {
      logger.info('No se encontro el usuario con email: ' + req.body.email);
      return res.status(401).json({
        message: "Usuario inexistente"
      });
    }
    
    user.verifyPassword(req.body.email, req.body.password,
      function (err, isMatch) {
        if (err) {
          logger.error('Ocurrio un error al comprobar el password');
          logger.error(err);
          res.status(401).json({
            error: error
          });
        }
        if (!isMatch) {
          return res.status(401).json({
            error: 'Nombre de usuario o contraseña incorrectos'
          });
        }
        else {
          var token = jwt.sign({
            randomizer: jwt_gen(),
            user: user._id
          }, config.Auth.tokenSecret, { expiresIn: config.Auth.tokenTimeStamp });
          
          //Agrego el token al usuario y lo guardo
          user.tokens.push(token);
          user.save(function (error, user) {
            if (error) {
              logger.error('Ocurrio un error al guardar el token en el usuario');
              logger.error(error);
              return next(error);
            }
            return res.status(200).json({
              message: "Usuario logueado correctamente",
              token: token
            });
          });
        }
      });
  });
}