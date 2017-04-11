var http = require('http')
var request = require('request')
var User = require('../models/user')

exports.listUsers = function (req, res) {
  User.find({}, function (error, users) {
    if (error) {
      logger.error('Ocurrio un error al buscar los usuarios')
      logger.error(error)
    }
    res.status(200).json({
      users: users
    })
  })
}

exports.addUser = function (req, res) {
  // se valida que el usuario no exista
  User.findOne({email: req.body.email}, function (err, user) {
    if (err) {
      logger.error('Error al intentar buscar al usuario: ' + req.body.email)
      logger.error('El error es:')
      logger.error(err)
      return next(err)
    }
    if (user === null) {
      var newUser = new User()

      newUser.email = req.body.email
      newUser.firstName = req.body.firstName
      newUser.lastName = req.body.lastName
      newUser.save(function (err) {
        if (err) {
          logger.error('Error al añadir usuario: ' + newUser.email + ' el error es:')
          logger.error(err)
          return res.json(err)
        }

        return res.json({message: 'Usuario añadido', user: newUser})
      })
    } else { // el usuario existe en el sistema, rechazar el nuevo usuario y mostrarlo
      return res.status(422).json({
        message: 'Usuario ya existe en la aplicación'
      })
    }
  })
}
