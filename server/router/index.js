module.exports = function (app) {
  app.use('/users', require('./routes/users'));
  app.use('/authorization', require('./routes/authorization'));
  app.use('/accounts', require('./routes/account'));
}
