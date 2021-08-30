module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    PORT: 5000,
    PASSWORD_REGEX: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/),
    EMAIL_REGEX: new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
};
