var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
  clientID: 2012751978958165,
  clientSecret: '5c3826407d81c8218b6c70b1ffbb3baa'
}, function (accessToken, refreshToken, profile, cb) {
  console.log(accessToken);
  console.log(refreshToken);
  console.log(profile);
  cb(null, { accessToken: accessToken });
}));

exports.isFacebookAuthenticated = passport.authenticate('facebook', { callbackUrl: '/auth/facebook/login_callback/' + req.params.id})(req, res, next)