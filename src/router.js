const router = require('express').Router()
const authController = require('./controllers/auth-controller.js');
const homeController = require('./controllers/home-controller.js');

router.use(homeController);
router.use(authController);

module.exports = router;