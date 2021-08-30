const router = require('express').Router();
const { userController } = require('../controllers');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', userController.getAllUsers);

router.get('/:user_id',
    userMiddleware.isUserByIdExists,
    userController.getUserById);

router.delete('/:user_id',
    userMiddleware.isUserByIdExists,
    userController.deleteUser);

router.put('/:user_id',
    userMiddleware.isUpdateUserDataValid,
    userMiddleware.isUserExists,
    userMiddleware.isEmailExists,
    userController.updateUser);

module.exports = router;
