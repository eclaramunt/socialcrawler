var userController = require('../../controllers/userController'),
  express = require('express'),
  router = express.Router(),
  accountController = require('../../controllers/accountController'),
  authorizationController = require('../../controllers/authorizationController'),
  passport = require('passport')

router.route('/')
  .get(userController.listUsers)
  .post(userController.addUser)

router.route('/:user/accounts')
  .get(accountController.getAccounts)
  .post(accountController.createAccount)

router.route('/:user/accounts/twitter')
  .get(authorizationController.twitterLogin)

router.route('/:user/accounts/twitters')
  .get(accountController.getTwitters)

module.exports = router
