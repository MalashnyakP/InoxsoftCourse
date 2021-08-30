const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorsHandler');
const StatusCodesEnum = require('../configs/statusCodesENUM');
const { userValidator } = require('../validators');

module.exports = {

    isCreateUserDataValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, error.details[0].message);
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

            const userByEmail = await User.findOne({ email: email.trim() });

            if (userByEmail) {
                throw new ErrorHandler(StatusCodesEnum.CONFLICT, 'User with this email already exists.');
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
                throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExists: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const userById = await User.findById(user_id);

            if (!userById) {
                throw new ErrorHandler(StatusCodesEnum.NOT_FOUND, 'User not found.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExists: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email: email.trim() });

            if (!userByEmail) {
                throw new ErrorHandler(StatusCodesEnum.NOT_FOUND, 'No user found.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserIdValid: (req, res, next) => {
        try {
            const { error } = userValidator.userIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateUserDataValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
