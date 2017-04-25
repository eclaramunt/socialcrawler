var http = require('http')
var request = require('request')
var User = require('../models/user')

exports.login = function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(401).json({
      error: "Ingrese usuario y contraseña"
    });
  }
  User.findOne({email: req.body.email}, function (error, user) {
    if (error) {
      logger.error('Ocurrio un error al buscar los usuarios')
      logger.error(error)
    }

    if (!user) {
      logger.info('No se encontro el usuario con email: ' + req.body.email);
      res.status(401).json({
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
          res.status(401).json({
            error: 'Nombre de usuario o contraseña incorrectos'
          });
        }
        else {
          res.status(200).json({
            token: '123ASD'
          });
        }
      });
  });
}