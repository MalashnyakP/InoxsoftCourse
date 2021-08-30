const { compare, hash } = require('../services/password.service');
const { STATUS_CODES } = require('../configs');
const { User } = require('../dataBase');
const { userUtil } = require('../utils');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = await hash(password);

            const user = await User.create({ ...req.body, password: hashPassword });

            const normalizedUser = userUtil.userNormalizator(user);
            res.status(STATUS_CODES.CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    signIn: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const userByEmail = await User.findOne({ email });

            await compare(password, userByEmail.password);

            const normalizedUser = userUtil.userNormalizator(userByEmail);
            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    }
};
