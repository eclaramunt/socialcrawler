var authorizationController = require('../../controllers/authorizationController'),
  express = require('express'),
  router = express.Router()

router.route('/callbacks/twitter')
  .get(authorizationController.twitterLogin, function (req, res, next) {
    return res.redirect('http://127.0.0.1:4200/');
  })

module.exports = router
