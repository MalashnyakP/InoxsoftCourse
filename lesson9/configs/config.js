module.exports = {
    PORT: process.env.PORT || 5000,
    DB_CONNECT_URL: process.env.MONGODB_URI || 'mongodb://localhost:27017/inoxoft',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'test',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'test_word',
    ACTION_TOKEN_SECRET: process.env.ACTION_TOKEN_SECRET || 'action_word',

    EMAIL_NAME_CREDENTIAL: process.env.EMAIL_NAME_CREDENTIAL || 'sample@gmail.com',
    EMAIL_PASS_CREDENTIAL: process.env.EMAIL_PASS_CREDENTIAL || 'Sample123!',
    FRONTEND_URL: process.env.FRONTEND_URL || 'google.com',

    FIRST_ADMIN_EMAIL: process.env.FIRST_ADMIN_EMAIL || 'sample_admin@gmail.com',
    FIRST_ADMIN_PASSWORD: process.env.FIRST_ADMIN_PASSWORD || 'Sample123!',
    FIRST_ADMIN_NAME: process.env.FIRST_ADMIN_NAME || 'Admin'
};
