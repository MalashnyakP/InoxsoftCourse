const router = require('express').Router();
const {
    signUp, signIn
} = require('../controllers/auth.controller');
const {
    isDataCorrect, isEmailExists, isEmailValid, isUserExists, isPasswordCorrect, isPasswordValid
} = require('../middlewares/user.middleware');

router.post('/auth', isEmailValid, isPasswordValid, isUserExists, isPasswordCorrect, signIn);

router.post('/signup', isDataCorrect, isEmailValid, isPasswordValid, isEmailExists, signUp);

module.exports = router;
