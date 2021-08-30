const router = require('express').Router();
const { userController } = require('../controllers');
const { userMiddleware } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:user_id',
    userMiddleware.isUserByIdExists,
    userController.getUserById);

router.delete('/:user_id',
    userMiddleware.isUserByIdExists,
    userController.deleteUser);

router.put('/:user_id',
    userMiddleware.isUpdateUserDataValid,
    userMiddleware.isUserByIdExists,
    userController.updateUser);

module.exports = router;
