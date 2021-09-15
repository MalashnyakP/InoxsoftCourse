const { config, CONSTANTS } = require('../configs');

const getSecret = (tokenType) => {
    if (tokenType === CONSTANTS.ACCESS) {
        return config.ACCESS_TOKEN_SECRET;
    }

    if (tokenType === CONSTANTS.REFRESH) {
        return config.REFRESH_TOKEN_SECRET;
    }

    return config.ACTION_TOKEN_SECRET;
};

module.exports = {
    getSecret
};
