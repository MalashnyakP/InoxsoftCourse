const { emailValidator } = require('../helper/emailValidator');
const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorsHandler');
const StatusCodesEnum = require('../configs/statusCodesENUM');

module.exports = {
    isDataCorrect: (req, res, next) => {
        try {
            const { email, name, password } = req.body;
            if (!email || !name || !password) {
                throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, 'Bad data.');
            }
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

    isEmailValid: (req, res, next) => {
        try {
            const { email } = req.body;

            if (!emailValidator(email.trim())) {
                throw new ErrorHandler(StatusCodesEnum.CONFLICT, 'Not valid email.');
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

    isPasswordValid: (req, res, next) => {
        try {
            const { password } = req.body;

            if (password.trim().length < 5) {
                throw new ErrorHandler(StatusCodesEnum.CONFLICT, 'Password isn\'t valid.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isPasswordCorrect: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email: email.trim() });

            if (user.password !== password.trim()) {
                throw new ErrorHandler(StatusCodesEnum.CONFLICT, 'Wrong password.');
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
