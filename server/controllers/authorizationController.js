var http = require('http')
var request = require('request')
var bCrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')
var passport = require('passport')
var BearerStrategy = require('passport-http-bearer').Strategy
var TwitterStrategy = require('passport-twitter').Strategy
var User = require('../models/user')
var Account = require('../models/account')

var myLogClass = require('../utils/logger')
var logger = new myLogClass()

var config = require('../config')

function jwt_gen () {
  var seed = config.Auth.key_seed + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
  return bCrypt.hashSync(seed, false)
}

exports.login = function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.status(401).json({
      error: 'Ingrese usuario y contraseña'
    })
  }
  User.findOne({email: req.body.email}, function (error, user) {
    if (error) {
      logger.error('Ocurrio un error al buscar los usuarios')
      logger.error(error)
      return next(error)
    }

    if (!user) {
      logger.info('No se encontro el usuario con email: ' + req.body.email)
      return res.status(401).json({
        message: 'Usuario inexistente'
      })
    }

    user.verifyPassword(req.body.email, req.body.password,
      function (err, isMatch) {
        if (err) {
          logger.error('Ocurrio un error al comprobar el password')
          logger.error(err)
          res.status(401).json({
            error: error
          })
        }
        if (!isMatch) {
          return res.status(401).json({
            error: 'Nombre de usuario o contraseña incorrectos'
          })
        }else {
          var token = jwt.sign({
            randomizer: jwt_gen(),
            user: user._id
          }, config.Auth.tokenSecret, { expiresIn: config.Auth.tokenTimeStamp })

          // Agrego el token al usuario y lo guardo
          user.tokens = [token]
          user.save(function (error, user) {
            if (error) {
              logger.error('Ocurrio un error al guardar el token en el usuario')
              logger.error(error)
              return next(error)
            }
            return res.status(200).json({
              message: 'Usuario logueado correctamente',
              token: token,
              user: user._id
            })
          })
        }
      })
  })
}

passport.use(new BearerStrategy({passReqToCallback: true}, // pasamos el req para devolver el usuario
  function (req, token, done) {
    jwt.verify(token, config.Auth.tokenSecret,
      function (err, decoded) {
        if (err) {
          logger.error('Error al verificar token: ' + token + ' probablemente esté expirado')
          if (err.name == 'TokenExpiredError' && err.message == 'jwt expired') {
            // Token expirado !
          }
          return done(401, err)
        }
        User.findOne({tokens: token}, function (err, user) {
          if (err) {
            logger.error('Intento de acceso con token inválido porque fallo la búsqueda de usuario')
            return done(err)
          }
          if (!user) {
            logger.warn('Intento de acceso con token inválido, correo incorrecto')
            req.body.error = true
            return done(err, false)
          }
          req.body.user = user
          req.body.token = token
          return done(null, req)
        })
      })
  })
)

exports.isUserAuthenticate = passport.authenticate('bearer', {session: false})

passport.use(new TwitterStrategy({
  consumerKey: 'NFdRuIMvNyR0zSYm8Fb8marg4',
  consumerSecret: 'bCy8SzLFS1Iyvzep95QFx9oqVFalEcVje2cgREVZNL9oHM9iVq',
  passReqToCallback: true
},
  function (req, token, tokenSecret, profile, cb) {
    // Verifico si existe el usuario o sino lo creo
    User.find({_id: req.params.id}, function (error, user) {
      if (error) {
        logger.error('Ocurrio un error al buscar al usuario')
        logger.error(error)
        return cb(error)
      }
      if (!user) {
        logger.error('No existe el usuario !!')
        return cb(error)
      }
      user = user[0]
      // Busco la cuenta para este usuario de twitter
      Account.find({User: user, type: 'twitter', profile_id: profile.id}, function (error, account) {
        if (error) {
          logger.error('Ocurrio un error al buscar la cuenta')
          logger.error(error)
          return cb(error)
        }
        if (!account) {
          logger.info('La cuenta de Twitter no esta configurada para el usuario')
          logger.info('Creando una cuenta en twitter ...')
          return cb(null, user)
        }else {
          logger.info('Logueando al usuario con su cuenta en Twitter')
          return cb(null, user)
        }
      })
    })
  }
))

passport.serializeUser(function (user, cb) {
  cb(null, user)
})

passport.deserializeUser(function (obj, cb) {
  cb(null, obj)
})

exports.twitterLogin = passport.authenticate('twitter')
