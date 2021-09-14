const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorsHandler');
const { errors: { BAD_REQUEST: { LOG_IN } } } = require('../configs');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatches = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatches) {
            throw new ErrorHandler(LOG_IN.status_code, LOG_IN.custom_code, LOG_IN.msg);
        }
    }
};
