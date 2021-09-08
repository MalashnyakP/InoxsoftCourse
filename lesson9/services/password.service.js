const bcrypt = require('bcrypt');

const ErrorsHandler = require('../errors/ErrorsHandler');
const { statusCodesENUM } = require('../configs');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),

    compare: async (password, hashPassword) => {
        const isPasswordMatches = await bcrypt.compare(password, hashPassword);

        if (!isPasswordMatches) {
            throw new ErrorsHandler(statusCodesENUM.BAD_REQUEST, 'Email or password is wrong.');
        }
    }
};
