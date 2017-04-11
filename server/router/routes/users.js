var userController = require('../../controllers/userController'),
  express = require('express'),
  router = express.Router()

router.route('/')
  .get(userController.listUsers)
  .post(userController.addUser)

module.exports = router
