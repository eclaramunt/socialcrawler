var authorizationController = require('../../controllers/authorizationController'),
  express = require('express'),
  router = express.Router()

router.route('/callbacks/twitter')
  .get(authorizationController.twitterLogin, function (req, res, next) {
    // console.log(req.body)
    // console.log(req.params)
    return res.json({message: 'final en callbacks'})
  })

module.exports = router
