var userController = require('../../controllers/userController'),
  express = require('express'),
  router = express.Router(),
  accountController = require('../../controllers/accountController')

router.route('/')
  .get(userController.listUsers)
  .post(userController.addUser);

router.route('/:user/accounts')
  .get(accountController.getAccounts)
  .post(accountController.createAccount)

module.exports = router
