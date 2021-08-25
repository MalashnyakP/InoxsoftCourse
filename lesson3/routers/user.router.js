const router = require('express').Router();
const {getAllUsers, getUserById} = require('../controllers/user.controller');

router.get('/', getAllUsers);

router.get('/:user_id', getUserById);

module.exports = router;