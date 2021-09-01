const router = require('express').Router();

const { authController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.post('/auth',
    userMiddleware.isLogInDataValid,
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserExists,
    authController.signIn);

router.post('/signup',
    userMiddleware.isCreateUserDataValid,
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserNotExists,
    authController.signUp);

module.exports = router;
