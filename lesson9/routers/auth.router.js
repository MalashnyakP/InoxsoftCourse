const router = require('express').Router();

const { CONSTANTS, USER_ROLE } = require('../configs');
const { authController } = require('../controllers');
const { ActionToken } = require('../dataBase');
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
    userMiddleware.isUserActive,
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

router.post('/auth/begin_pass_reset',
    userMiddleware.isEmailDataValid,
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserExists,
    authController.beginResetPassword);

router.post('/auth/reset_pass',
    authMiddleware.checkToken(CONSTANTS.ACTION, ActionToken),
    authMiddleware.isPasswordsIdentical,
    authMiddleware.isNewPassSameAsOld,
    authController.resetPassword);

router.post('/auth/create_admin',
    userMiddleware.isEmailDataValid,
    authMiddleware.checkToken(),
    userMiddleware.checkUserRole([USER_ROLE.ADMIN]),
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserNotExists,
    authController.createNewAdmin);

router.post('/auth/set_admin',
    authMiddleware.checkToken(CONSTANTS.ACTION, ActionToken),
    authMiddleware.isPasswordsIdentical,
    userMiddleware.isSetUserDataValid,
    authController.setAdminData);

module.exports = router;
