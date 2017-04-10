const express = require('express')
const app = express()

// routes
var router = require('./router')(app)

// Error Handling
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  console.log(err)
})

// Turn on that server!
app.listen(3000, () => {
  console.log('App listening on port 3000')
})

module.exports = app
