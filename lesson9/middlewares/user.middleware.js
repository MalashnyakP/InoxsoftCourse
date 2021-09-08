const { STATUS_CODES, USER_STATES } = require('../configs');
const ErrorHandler = require('../errors/ErrorsHandler');
const { User } = require('../dataBase');
const { userValidator } = require('../validators');

module.exports = {
    checkUserRole: (roles = []) => (req, res, next) => {
        try {
            const { role } = req.current_user;

            if (!roles.length) {
                return next();
            }

            if (!roles.includes(role)) {
                throw new ErrorHandler(STATUS_CODES.FORBIDDEN, 'This user role forbiden from this action.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

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

    isEmailDataValid: (req, res, next) => {
        try {
            const { error, value } = userValidator.userEmailValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

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

    isUserActive: (req, res, next) => {
        try {
            const { user } = req;

            if (user.state !== USER_STATES.ACTIVE) {
                throw new ErrorHandler(STATUS_CODES.FORBIDDEN, 'User not active.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserExists: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, 'No user found.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserNotExists: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(STATUS_CODES.CONFLICT, 'User with this email already exists.');
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
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
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
    },

    isSetUserDataValid: async (req, res, next) => {
        try {
            const { error, value } = userValidator.setUserDataValidator.validate(req.body);

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
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
        try {
            const searchValue = req[searchIn][paramName];

            const user = await User.findOne({ [dbField]: searchValue });

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
