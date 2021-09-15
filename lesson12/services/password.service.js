const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorsHandler');
const { errors: { BAD_REQUEST: { LOG_IN, PASSWORD_SAME_AS_OLD_ONE } } } = require('../configs');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatches = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatches) {
            throw new ErrorHandler(LOG_IN.status_code, LOG_IN.custom_code, LOG_IN.msg);
        }
    },

    compareNewToOld: async (newPassword, hashPassword) => {
        const isPasswordMatches = await bcrypt.compare(newPassword, hashPassword);

        if (isPasswordMatches) {
            throw new ErrorHandler(
                PASSWORD_SAME_AS_OLD_ONE.status_code, PASSWORD_SAME_AS_OLD_ONE.custom_code, PASSWORD_SAME_AS_OLD_ONE.msg
            );
        }
    }
};
