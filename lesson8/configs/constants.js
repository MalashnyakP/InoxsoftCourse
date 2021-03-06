module.exports = {
    AUTHORIZATION: 'Authorization',
    CURRENT_YEAR: new Date().getFullYear(),
    PASSWORD_REGEX: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEX: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    MONGO_BD_ID: new RegExp(/^[0-9a-fA-F]{24}$/),

    ACCESS: 'access',
    REFRESH: 'refresh',
    ACTION: 'action',

    RESET_PASS_LINK: 'http://localhost:5000/auth/reset_pass?action_token='
};
