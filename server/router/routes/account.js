var accountController = require('../../controllers/accountController'),
  express = require('express'),
  router = express.Router()

router.route('/')
  .get(accountController.getAccounts);

module.exports = router
