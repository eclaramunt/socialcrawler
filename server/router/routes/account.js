var authorizationController = require('../../controllers/'),
  express = require('express'),
  router = express.Router()

router.route('/')
  .post(authorizationController.login);

module.exports = router
