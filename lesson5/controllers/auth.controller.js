const { compare, hash } = require('../services/password.service');
const StatusCodesEnum = require('../configs/statusCodesENUM');
const { User } = require('../dataBase');
const { userNormalizator } = require('../utils/user.utils');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = await hash(password);

            const user = await User.create({ ...req.body, password: hashPassword });

            const normalizedUser = userNormalizator(user);
            res.status(StatusCodesEnum.CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    signIn: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const userByEmail = await User.findOne({ email });

            await compare(password, userByEmail.password);

            const normalizedUser = userNormalizator(userByEmail);
            res.json(normalizedUser);
        } catch (e) {
            next(e);
        }
    }
};
