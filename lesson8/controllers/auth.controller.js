const {
    STATUS_CODES, CONSTANTS, databaseTableEnum, emailActionsEnum
} = require('../configs');
const { ActionToken, OAuth, User } = require('../dataBase');
const { userUtil } = require('../utils');
const {
    authService, emailService, jwtService, passwordService
} = require('../services');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashPassword = await passwordService.hash(password);

            const user = await User.create({ ...req.body, password: hashPassword });

            const normalizedUser = userUtil.userNormalizator(user);

            emailService.sendEmail(normalizedUser.email, emailActionsEnum.WELCOME, { userName: normalizedUser.name });

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

    logOutFromAllDevices: (req, res, next) => {
        try {
            const { current_user } = req;

            authService.logOutUserFromAllDevices(current_user);

            res.status(STATUS_CODES.NO_CONTENT).json('User loged out successfully from all devices.');
            next();
        } catch (e) {
            next(e);
        }
    },

    beginResetPassword: async (req, res, next) => {
        try {
            const { user, body: { email } } = req;

            const action_token = jwtService.generateActionToken();

            await ActionToken.create({ action_token, [databaseTableEnum.USER]: user._id });

            const reset_link = `http://localhost:5000/auth/reset_pass?action_token=${action_token}`;

            emailService.sendEmail(email, emailActionsEnum.RESET, { reset_link });

            res.json({ action_token, user: userUtil.userNormalizator(user) });
            next();
        } catch (e) {
            next(e);
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const { new_pass, user } = req;

            const current_user = await User.findByIdAndUpdate({ _id: user._id }, { password: new_pass });

            await ActionToken.deleteMany({ user: user._id });

            authService.logOutUserFromAllDevices(current_user);

            res.json('Password changed.');
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
