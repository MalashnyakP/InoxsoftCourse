const { STATUS_CODES, CONSTANTS, databaseTableEnum } = require('../configs');
const { OAuth, User } = require('../dataBase');
const { userUtil } = require('../utils');
const { jwtService, passwordService } = require('../services');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = await passwordService.hash(password);

            const user = await User.create({ ...req.body, password: hashPassword });

            const normalizedUser = userUtil.userNormalizator(user);
            res.status(STATUS_CODES.CREATED).json(normalizedUser);
        } catch (e) {
            next(e);
        }
    },

    signIn: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(password, user.password);

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({ ...tokenPair, user: userUtil.userNormalizator(user) });
        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const access_token = req.get(CONSTANTS.AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.status(STATUS_CODES.NO_CONTENT).json('User loged out successfully.');
            next();
        } catch (e) {
            next(e);
        }
    },

    logOutFromAllDevices: async (req, res, next) => {
        try {
            const { current_user } = req;

            await OAuth.deleteMany({ [databaseTableEnum.USER]: current_user._id });

            res.status(STATUS_CODES.NO_CONTENT).json('User loged out successfully from all devices.');
            next();
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(CONSTANTS.AUTHORIZATION);
            const { current_user } = req;

            const tokenPair = jwtService.generateTokenPair();

            await OAuth.findOneAndUpdate({ refresh_token }, tokenPair);

            res.json({ ...tokenPair, user: userUtil.userNormalizator(current_user) });
            next();
        } catch (e) {
            next(e);
        }
    }
};
