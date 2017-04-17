const express = require('express')
var config = require('./config');
var bodyParser = require('body-parser');

var passport = require('passport');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// passport inicializacion
app.use(passport.initialize());

// error handling
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  console.log(err)
});

// uso de CORS y OPTIONS method
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // intercept OPTIONS method
  if (req.method == 'OPTIONS') {
    res.status(200).json({});
  }
  else {
    next();
  }
});

// routes
var router = require('./router')(app)

// mongoose
var mongoose = require('mongoose');
var urlMongoose = config.Mongo.client + "://" + config.Mongo.host + ":" + config.Mongo.port + "/" + config.Mongo.dbName;

mongoose.connect(urlMongoose, function (err) {
    if (err) throw err;
});

// Turn on that server!
app.listen(3000, () => {
  console.log('App listening on port 3000')
})

module.exports = app
