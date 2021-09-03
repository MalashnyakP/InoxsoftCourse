const router = require('express').Router();

const { CONSTANTS } = require('../configs');
const { authController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/signup',
    userMiddleware.isCreateUserDataValid,
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserNotExists,
    authController.signUp);

router.post('/auth',
    userMiddleware.isLogInDataValid,
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserExists,
    authController.signIn);

router.post('/auth/logout',
    authMiddleware.checkToken(),
    authController.logOut);

router.post('/auth/logout_all',
    authMiddleware.checkToken(),
    authController.logOutFromAllDevices);

router.post('/auth/refresh',
    authMiddleware.checkToken(CONSTANTS.REFRESH),
    authController.refreshToken);

module.exports = router;
