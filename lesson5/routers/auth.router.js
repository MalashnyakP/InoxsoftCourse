const router = require('express').Router();
const { authController } = require('../controllers');

const { userMiddleware } = require('../middlewares');

router.post('/auth',
    userMiddleware.isLogInDataValid,
    userMiddleware.isUserExists,
    userMiddleware.isPasswordCorrect,
    authController.signIn);

router.post('/signup',
    userMiddleware.isCreateUserDataValid,
    userMiddleware.isEmailExists,
    authController.signUp);

module.exports = router;
