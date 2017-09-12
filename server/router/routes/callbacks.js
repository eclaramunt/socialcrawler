var authorizationController = require('../../controllers/authorizationController'),
  express = require('express'),
  router = express.Router()

router.route('/callbacks/twitter')
  .get(authorizationController.twitterLogin, function (req, res, next) {
    console.log(req.user)
    return res.json({message: 'final'})
  })

module.exports = router
