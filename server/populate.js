var config = require('./config')
// mongoose
var mongoose = require('mongoose')
var urlMongoose = config.Mongo.client + '://' + config.Mongo.host + ':' + config.Mongo.port + '/' + config.Mongo.dbName

mongoose.connect(urlMongoose, function (err) {
  if (err) throw err
})

var _ = require('underscore')
var User = require('./models/user')

User.remove({}, function (error) {
  console.log('usuarios borrados')
})

let newUser = new User()
newUser.email = 'ezequiel.claramunt@gmail.com'
newUser.firstName = 'Ezequiel'
newUser.lastName = 'Claramunt'
newUser.password = 'asdasdasd'
newUser.save(function (err) {
  if (err) {
    console.log('Ocurrio un error al guardar al usuario')
  }

  console.log('Usuario añadido correctamente')
})
