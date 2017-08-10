var passport = require('passport')
FacebookStrategy = require('passport-facebook')

passport.use(new FacebookStrategy({
  clientID: 2012751978958165,
  clientSecret: '5c3826407d81c8218b6c70b1ffbb3baa',
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
},
  function (accessToken, refreshToken, profile, cb) {
    return cb(accessToken, refreshToken)
  }
))

exports.fbAuthenticated = passport.authenticate('facebook')
