module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECT_URL: process.env.MONGODB_URI || 'mongodb://localhost:27017/inoxoft',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'test',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'test_word'
};
