const router = require('express').Router();
const {
    signUp, signIn, renderSignUpPage, renderSignInPage
} = require('../controllers/auth.controller');

router.post('/auth', signIn);
router.get('/auth', renderSignInPage);

router.post('/signup', signUp);
router.get('/signup', renderSignUpPage);

module.exports = router;
