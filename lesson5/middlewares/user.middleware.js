const { CONSTANTS, STATUS_CODES } = require('../configs');
const ErrorHandler = require('../errors/ErrorsHandler');
const { User } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
    isCreateUserDataValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isEmailExists: async (req, res, next) => {
        try {
            const { email } = req.body;

            if (!CONSTANTS.EMAIL_REGEX.test(email)) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, 'Invalid email.');
            }

            const userByEmail = await User.findOne({ email: email.trim() });

            if (userByEmail) {
                throw new ErrorHandler(STATUS_CODES.CONFLICT, 'User with this email already exists.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isLogInDataValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.logInUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExists: async (req, res, next) => {
        try {
            const { value, error } = userValidator.userIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
            }

            const userById = await User.findById(value.user_id);

            if (!userById) {
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, 'User not found.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExists: async (req, res, next) => {
        try {
            const { email } = req.body;

            if (!CONSTANTS.EMAIL_REGEX.test(email)) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, 'Invalid email.');
            }
            const userByEmail = await User.findOne({ email: email.trim() });

            if (!userByEmail) {
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, 'No user found.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateUserDataValid: async (req, res, next) => {
        try {
            const { error, value } = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
            }

            if (value.email) {
                const userByEmail = await User.findOne({ email: value.email.trim() });

                if (userByEmail) {
                    throw new ErrorHandler(STATUS_CODES.CONFLICT, 'User with this email already exists.');
                }
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
