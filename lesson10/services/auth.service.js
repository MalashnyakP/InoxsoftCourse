const { OAuth } = require('../dataBase');
const { databaseTableEnum } = require('../configs');

module.exports = {
    logOutUserFromAllDevices: async (user) => {
        await OAuth.deleteMany({ [databaseTableEnum.USER]: user._id });
    }
};
