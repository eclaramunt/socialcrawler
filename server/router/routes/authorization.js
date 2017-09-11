var authorizationController = require('../../controllers/authorizationController'),
  express = require('express'),
  router = express.Router()

router.route('/')
  .post(authorizationController.login);

router.route('/twitter')
  .get(authorizationController.twitter)

module.exports = router
