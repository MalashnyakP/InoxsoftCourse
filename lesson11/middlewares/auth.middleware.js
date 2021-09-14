const {
    CONSTANTS, databaseTableEnum,
    errors: { BAD_REQUEST: { PASSWORDS_DONT_MATCH, PASSWORD_INVALID }, UNAUTHORIZED: { INVALID_TOKEN } }
} = require('../configs');
const ErrorHandler = require('../errors/ErrorsHandler');
const { jwtService, passwordService } = require('../services');
const { OAuth } = require('../dataBase');

module.exports = {
    checkToken: (tokenType = CONSTANTS.ACCESS, tokenDB = OAuth) => async (req, res, next) => {
        try {
            const token = req.get(CONSTANTS.AUTHORIZATION);

            if (!token) {
                throw new ErrorHandler(INVALID_TOKEN.status_code, INVALID_TOKEN.custom_code, INVALID_TOKEN.msg);
            }

            await jwtService.verifyToken(token, tokenType);

            const DBField = `${tokenType}_token`;

            const tokenFromDb = await tokenDB.findOne({ [DBField]: token }).populate(databaseTableEnum.USER);

            if (!tokenFromDb) {
                throw new ErrorHandler(INVALID_TOKEN.status_code, INVALID_TOKEN.custom_code, INVALID_TOKEN.msg);
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
                throw new ErrorHandler(PASSWORD_INVALID.status_code, PASSWORD_INVALID.custom_code, PASSWORD_INVALID.msg);
            }

            if (password !== password_repeat) {
                throw new ErrorHandler(
                    PASSWORDS_DONT_MATCH.status_code, PASSWORDS_DONT_MATCH.custom_code, PASSWORDS_DONT_MATCH.msg
                );
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
