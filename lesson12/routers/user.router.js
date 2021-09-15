const router = require('express').Router();

const { userController } = require('../controllers');
const { authMiddleware, userMiddleware } = require('../middlewares');
const { VALIDATORS_ENUM, REQ_FIELDS_ENUM } = require('../configs');

router.get('/', userController.getAllUsers);

router.use('/:user_id',
    userMiddleware.validateDataDynamic(VALIDATORS_ENUM.USER_ID, REQ_FIELDS_ENUM.PARAMS),
    userMiddleware.getUserByDynamicParam('user_id', REQ_FIELDS_ENUM.PARAMS, '_id'),
    userMiddleware.doesUserExist);

router.get('/:user_id',
    userController.getUserById);

router.put('/:user_id',
    userMiddleware.validateDataDynamic(VALIDATORS_ENUM.UPDATE_USER),
    authMiddleware.checkToken(),
    userController.updateUser);

router.delete('/:user_id',
    userMiddleware.validateDataDynamic(VALIDATORS_ENUM.USER_ID, REQ_FIELDS_ENUM.PARAMS),
    authMiddleware.checkToken(),
    userController.deleteUser);

module.exports = router;
