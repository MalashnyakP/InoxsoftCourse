module.exports = {
    AUTHORIZATION: 'Authorization',
    CURRENT_YEAR: new Date().getFullYear(),
    PASSWORD_REGEX: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEX: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
    MONGO_BD_ID: new RegExp(/^[0-9a-fA-F]{24}$/),

    ACCESS: 'access',
    REFRESH: 'refresh'
};
