const {
    errors: {
        BAD_REQUEST: { VALIDATION }, CONFLICT: { USER_CONFLICT },
        FORBIDDEN: { USER_ACTIVE, USER_FORBIDDEN }, NOT_FOUND: { USER_NF }
    }, USER_STATES, REQ_FIELDS_ENUM
} = require('../configs');
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
                throw new ErrorHandler(USER_FORBIDDEN.status_code, USER_FORBIDDEN.custom_code, USER_FORBIDDEN.msg);
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
                throw new ErrorHandler(VALIDATION.status_code, VALIDATION.custom_code, error.details[0].message);
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
                throw new ErrorHandler(USER_ACTIVE.status_code, USER_ACTIVE.custom_code, USER_ACTIVE.msg);
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
                throw new ErrorHandler(USER_NF.status_code, USER_NF.custom_code, USER_NF.msg);
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
                throw new ErrorHandler(USER_CONFLICT.status_code, USER_CONFLICT.custom_code, USER_CONFLICT.msg);
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
