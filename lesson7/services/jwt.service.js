const jwt = require('jsonwebtoken');

const { config, CONSTANTS, STATUS_CODES } = require('../configs');
const ErrorHandler = require('../errors/ErrorsHandler');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, config.REFRESH_TOKEN_SECRET, { expiresIn: '31d' });

        return { access_token, refresh_token };
    },

    verifyToken: (token, tokenType = CONSTANTS.ACCESS) => {
        try {
            const secretKey = tokenType === CONSTANTS.ACCESS ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;

            jwt.verify(token, secretKey);
        } catch (e) {
            throw new ErrorHandler(STATUS_CODES.UNA, 'Invalid token.');
        }
    }
};
