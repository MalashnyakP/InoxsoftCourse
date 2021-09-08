const { STATUS_CODES, USER_STATES, REQ_FIELDS_ENUM } = require('../configs');
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

    validateDataDynamic: (validatorName, dataIn = REQ_FIELDS_ENUM.BODY) => (req, res, next) => {
        try {
            const { error, value } = userValidator[validatorName].validate(req[dataIn]);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
            }

            req[dataIn] = value;

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

    getUserByDynamicParam: (paramName, searchIn = REQ_FIELDS_ENUM.BODY, dbField = paramName) => async (req, res, next) => {
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
