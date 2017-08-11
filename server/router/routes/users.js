var userController = require('../../controllers/userController'),
  express = require('express'),
  router = express.Router(),
  accountController = require('../../controllers/accountController');

var passport = require('passport');

router.route('/')
  .get(userController.listUsers)
  .post(userController.addUser);

router.route('/:id/account/facebook')
  .get(function (req, res, next) {
    passport.authenticate(
      'facebook',
      { callbackURL: '/auth/facebook/login_callback/' + req.params.id }
    )(req, res, next);
  }, accountController.createAccount);

module.exports = router
