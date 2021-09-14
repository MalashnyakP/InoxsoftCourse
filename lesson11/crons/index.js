const cron = require('node-cron');

const tokenCrone = require('./token.crons');

module.exports = () => {
    cron.schedule('0 0 * * *', () => {
        tokenCrone.removeOldTokens();
    });
};
