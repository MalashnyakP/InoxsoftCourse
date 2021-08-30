const router = require('express').Router();
const { userController } = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getAllUsers);

router.get('/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserByIdExists,
    userController.getUserById);

router.delete('/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.isUserByIdExists,
    userController.deleteUser);

router.put('/:user_id',
    userMiddleware.isUserIdValid,
    userMiddleware.isUpdateUserDataValid,
    userMiddleware.isEmailExists,
    userController.updateUser);

module.exports = router;
