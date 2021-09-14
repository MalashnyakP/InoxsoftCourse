const {
    STATUS_CODES, config, CONSTANTS, databaseTableEnum, emailActionsEnum, USER_STATES
} = require('../configs');
const { ActionToken, OAuth, User } = require('../dataBase');
const { userUtil } = require('../utils');
const {
    authService, emailService, jwtService, passwordService, s3Service
} = require('../services');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            let user = await User.createUserWithHashPass(req.body);

            if (req.files && req.files.avatar) {
                const { avatar } = req.files;

                const imgLocation = await s3Service.upload(avatar, 'user', user._id.toString());

                user = await User.findByIdAndUpdate(user._id, { avatar: imgLocation }, { new: true });
            }

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

            const reset_link = `${config.FRONTEND_URL}/auth/reset_pass?action_token=${action_token}`;

            emailService.sendEmail(email, emailActionsEnum.RESET, { reset_link });

            res.json({ action_token, user: userUtil.userNormalizator(user) });
            next();
        } catch (e) {
            next(e);
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const { password, current_user } = req;

            await User.findByIdAndUpdate({ _id: current_user._id }, { password });

            await ActionToken.deleteMany({ user: current_user._id });

            authService.logOutUserFromAllDevices(current_user);

            res.json('Password changed.');
            next();
        } catch (e) {
            next(e);
        }
    },

    createNewAdmin: async (req, res, next) => {
        try {
            const { current_user } = req;

            const newAdmin = await User.create({ ...req.body, state: USER_STATES.INACTIVE });

            const action_token = jwtService.generateActionToken();

            await ActionToken.create({ action_token, [databaseTableEnum.USER]: newAdmin._id });

            const set_link = `${config.FRONTEND_URL}/auth/set_admin?action_token=${action_token}`;

            emailService.sendEmail(newAdmin.email, emailActionsEnum.SET_DATA, { set_link, admin_email: current_user.email });

            res.json({ action_token, user: userUtil.userNormalizator(newAdmin) });
            next();
        } catch (e) {
            next(e);
        }
    },

    setAdminData: async (req, res, next) => {
        try {
            const { body: { name, password }, current_user } = req;

            const hashPassword = await passwordService.hash(password);

            await User.findByIdAndUpdate({ _id: current_user._id }, { password: hashPassword, name, state: USER_STATES.ACTIVE });

            await ActionToken.deleteMany({ user: current_user._id });

            authService.logOutUserFromAllDevices(current_user);

            res.json('Data set.');
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
