const router = require('express').Router();

const { CONSTANTS, VALIDATORS_ENUM, USER_ROLE } = require('../configs');
const { authController } = require('../controllers');
const { ActionToken } = require('../dataBase');
const { authMiddleware, userMiddleware } = require('../middlewares');

router.post('/signup',
    userMiddleware.validateDataDynamic(VALIDATORS_ENUM.CREATE_USER),
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserNotExists,
    authController.signUp);

router.post('/auth',
    userMiddleware.validateDataDynamic(VALIDATORS_ENUM.LOG_IN_USER),
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
    userMiddleware.validateDataDynamic(VALIDATORS_ENUM.USER_EMAIL),
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserExists,
    authController.beginResetPassword);

router.post('/auth/reset_pass',
    authMiddleware.checkToken(CONSTANTS.ACTION, ActionToken),
    authMiddleware.isPasswordsIdentical,
    authMiddleware.isNewPassSameAsOld,
    authController.resetPassword);

router.post('/auth/create_admin',
    userMiddleware.validateDataDynamic(VALIDATORS_ENUM.USER_EMAIL),
    authMiddleware.checkToken(),
    userMiddleware.checkUserRole([USER_ROLE.ADMIN]),
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserNotExists,
    authController.createNewAdmin);

router.post('/auth/set_admin',
    userMiddleware.validateDataDynamic(VALIDATORS_ENUM.SET_USER_DATA),
    authMiddleware.checkToken(CONSTANTS.ACTION, ActionToken),
    authMiddleware.isPasswordsIdentical,
    authController.setAdminData);

module.exports = router;
