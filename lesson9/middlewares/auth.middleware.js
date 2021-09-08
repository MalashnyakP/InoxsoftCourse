const { CONSTANTS, STATUS_CODES, databaseTableEnum } = require('../configs');
const ErrorHandler = require('../errors/ErrorsHandler');
const { jwtService, passwordService } = require('../services');
const { OAuth } = require('../dataBase');

module.exports = {
    checkToken: (tokenType = CONSTANTS.ACCESS, tokenDB = OAuth) => async (req, res, next) => {
        try {
            const token = req.get(CONSTANTS.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(STATUS_CODES.UNA, 'Invalid token.');
            }

            await jwtService.verifyToken(token, tokenType);

            const DBField = `${tokenType}_token`;

            const tokenFromDb = await tokenDB.findOne({ [DBField]: token }).populate(databaseTableEnum.USER);

            if (!tokenFromDb) {
                throw new ErrorHandler(STATUS_CODES.UNA, 'Invalid token.');
            }

            req.current_user = tokenFromDb.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordsIdentical: (req, res, next) => {
        try {
            const { password, password_repeat } = req.body;

            if (!CONSTANTS.PASSWORD_REGEX.test(password)) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, 'Passwords isn\'t valid.');
            }

            if (password !== password_repeat) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, 'Passwords don\'t match.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isNewPassSameAsOld: async (req, res, next) => {
        try {
            const { current_user, body: { password } } = req;

            await passwordService.compare(password, current_user.password);

            req.password = await passwordService.hash(password);

            next();
        } catch (e) {
            next(e);
        }
    }
};
