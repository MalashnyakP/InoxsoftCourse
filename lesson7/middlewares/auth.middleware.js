const { CONSTANTS, STATUS_CODES, databaseTableEnum } = require('../configs');
const ErrorHandler = require('../errors/ErrorsHandler');
const { jwtService } = require('../services');
const { OAuth } = require('../dataBase');

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
    }
};
