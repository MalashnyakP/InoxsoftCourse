const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const { ActionToken, OAuth } = require('../models');

module.exports = {
    removeOldTokens: async () => {
        const prevMonth = dayjs.utc().subtract(1, 'month');

        await ActionToken.deleteMany({ createdAt: { $lt: prevMonth } });
        await OAuth.deleteMany({ createdAt: { $lt: prevMonth } });
    }
};
