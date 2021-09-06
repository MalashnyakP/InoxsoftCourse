const { CONSTANTS, STATUS_CODES, databaseTableEnum } = require('../configs');
const ErrorHandler = require('../errors/ErrorsHandler');
const { jwtService, passwordService } = require('../services');
const { ActionToken, OAuth } = require('../dataBase');

module.exports = {
    checkToken: (tokenType = CONSTANTS.ACCESS) => async (req, res, next) => {
        try {
            const token = req.get(CONSTANTS.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(STATUS_CODES.UNA, 'Invalid token.');
            }

            await jwtService.verifyToken(token, tokenType);

            const DBField = `${tokenType}_token`;

            const tokenFromDb = await OAuth.findOne({ [DBField]: token }).populate(databaseTableEnum.USER);

            if (!tokenFromDb) {
                throw new ErrorHandler(STATUS_CODES.UNA, 'Invalid token.');
            }

            req.current_user = tokenFromDb.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: async (req, res, next) => {
        try {
            const { action_token } = req.query;

            if (!action_token) {
                throw new ErrorHandler(STATUS_CODES.UNA, 'Invalid token.');
            }

            await jwtService.verifyToken(action_token, CONSTANTS.ACTION);

            const tokenFromDb = await ActionToken.findOne({ action_token }).populate(databaseTableEnum.USER);

            if (!tokenFromDb) {
                throw new ErrorHandler(STATUS_CODES.UNA, 'Invalid token.');
            }

            req.user = tokenFromDb.user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordsIdentical: (req, res, next) => {
        try {
            const { new_pass, new_pass_repeat } = req.body;

            if (!CONSTANTS.PASSWORD_REGEX.test(new_pass)) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, 'Passwords isn\'t valid.');
            }

            if (new_pass !== new_pass_repeat) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, 'Passwords don\'t match.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isNewPassSameAsOld: async (req, res, next) => {
        try {
            const { user, body: { new_pass } } = req;

            await passwordService.compare(new_pass, user.password);

            req.new_pass = await passwordService.hash(new_pass);

            next();
        } catch (e) {
            next(e);
        }
    }
};
