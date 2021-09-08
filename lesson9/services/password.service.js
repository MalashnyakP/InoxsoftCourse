const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorsHandler');
const { STATUS_CODES } = require('../configs');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatches = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatches) {
            throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, 'Email or password is wrong.');
        }
    }
};
