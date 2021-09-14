const jwt = require('jsonwebtoken');

const { config, CONSTANTS, errors: { UNAUTHORIZED: { INVALID_TOKEN } } } = require('../configs');
const ErrorHandler = require('../errors/ErrorsHandler');
const { tokenUtils } = require('../utils');

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, config.REFRESH_TOKEN_SECRET, { expiresIn: '31d' });

        return { access_token, refresh_token };
    },

    generateActionToken: () => {
        const action_token = jwt.sign({}, config.ACTION_TOKEN_SECRET, { expiresIn: '30m' });

        return action_token;
    },

    verifyToken: (token, tokenType = CONSTANTS.ACCESS) => {
        try {
            const secretKey = tokenUtils.getSecret(tokenType);

            jwt.verify(token, secretKey);
        } catch (e) {
            throw new ErrorHandler(INVALID_TOKEN.status_code, INVALID_TOKEN.custom_code, INVALID_TOKEN.msg);
        }
    }
};
