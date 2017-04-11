const express = require('express')
var config = require('./config');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// routes
var router = require('./router')(app)

// mongoose
var mongoose = require('mongoose');
var urlMongoose = config.Mongo.client + "://" + config.Mongo.host + ":" + config.Mongo.port + "/" + config.Mongo.dbName;

mongoose.connect(urlMongoose, function (err) {
    if (err) throw err;
});

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
