const { emailValidator } = require('../helper/emailValidator');
const { User } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorsHandler');

module.exports = {
    isEmailExists: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email: email.trim() });

            if (userByEmail) {
                throw new ErrorHandler(409, 'User with this email already exists.');
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
                throw new ErrorHandler(409, 'Not valid email.');
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
                throw new ErrorHandler(404, 'No user found.');
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
                throw new ErrorHandler(404, 'User not found.');
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
                throw new ErrorHandler(409, 'Password isn\'t valid.');
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
                throw new ErrorHandler(409, 'Wrong password.');
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
