var authorizationController = require('../../controllers/authorizationController'),
  express = require('express'),
  router = express.Router()

router.route('/')
  .post(authorizationController.login)

module.exports = router
