const router = require('express').Router();
const {
    signUp, signIn
} = require('../controllers/auth.controller');
const {
    isEmailExists, isEmailValid, isUserExists, isPasswordCorrect, isPasswordValid
} = require('../middlewares/user.middleware');

router.post('/auth', isEmailValid, isPasswordValid, isUserExists, isPasswordCorrect, signIn);

router.post('/signup', isEmailValid, isPasswordValid, isEmailExists, signUp);

module.exports = router;
