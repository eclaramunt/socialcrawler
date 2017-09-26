module.exports = function (app) {
  app.use('/api', require('./routes/callbacks'))
  app.use('/users', require('./routes/users'))
  app.use('/authorization', require('./routes/authorization'))
}
