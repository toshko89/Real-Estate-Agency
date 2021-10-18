const router = require('express').Router()
const authController = require('./controllers/auth-controller.js');
const homeController = require('./controllers/home-controller.js');
const { errorHandler } = require('./middleWares/error-middleware.js');

router.use(homeController);
router.use(authController);
router.use(errorHandler);


module.exports = router;