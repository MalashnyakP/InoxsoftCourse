const router = require('express').Router();
const {
    deleteUser, getAllUsers, getUserById, updateUser
} = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

router.get('/', getAllUsers);
router.get('/:user_id', userMiddleware.isUserByIdExists, getUserById);

router.delete('/:user_id', userMiddleware.isUserByIdExists, deleteUser);
router.put('/:user_id', userMiddleware.isEmailValid, userMiddleware.isPasswordValid,
    userMiddleware.isUserExists, userMiddleware.isEmailExists, updateUser);

module.exports = router;
