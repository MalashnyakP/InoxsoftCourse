const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.use('/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.getUserByDynamicParam('user_id', 'params', '_id'),
    userMiddleware.isUserExists);

router.get('/:user_id',
    userController.getUserById);

router.put('/:user_id',
    userMiddleware.isUpdateUserDataValid,
    userController.updateUser);

router.delete('/:user_id',
    userController.deleteUser);

module.exports = router;
