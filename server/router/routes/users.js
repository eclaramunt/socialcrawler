var userController = require('../../controllers/userController'),
  express = require('express'),
  router = express.Router(),
  accountController = require('../../controllers/accountController'),
  securityController = require('../../controllers/securityController')

router.route('/')
  .get(userController.listUsers)
  .post(userController.addUser)

router.route('/:user/accounts')
  .get(securityController.fbAuthenticated, accountController.createAccount)

module.exports = router
