const { Car } = require('../dataBase');
const { carValidator } = require('../validators');
const ErrorHandler = require('../errors/ErrorsHandler');
const {
    errors: {
        BAD_REQUEST: { NOT_OWNED_BY_USER, VALIDATION },
        NOT_FOUND: { CAR_NF }
    }, REQ_FIELDS_ENUM
} = require('../configs');

module.exports = {
    validateDataDynamic: (validatorName, dataIn = REQ_FIELDS_ENUM.BODY) => (req, res, next) => {
        try {
            const { error, value } = carValidator[validatorName].validate(req[dataIn]);

            if (error) {
                throw new ErrorHandler(VALIDATION.status_code, VALIDATION.custom_code, error.details[0].message);
            }

            req[dataIn] = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarExists: (req, res, next) => {
        try {
            const { car } = req;

            if (!car) {
                throw new ErrorHandler(CAR_NF.status_code, CAR_NF.custom_code, CAR_NF.msg);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isCarOwnedByUser: async (req, res, next) => {
        try {
            const { current_user, params: { car_id } } = req;

            const carOwnedByUser = await Car.findOne({ _id: car_id, user: current_user._id });

            if (!carOwnedByUser) {
                throw new ErrorHandler(NOT_OWNED_BY_USER.status_code, NOT_OWNED_BY_USER.custom_code, NOT_OWNED_BY_USER.msg);
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    getCarByDynamicParm: (paramName, searchIn = REQ_FIELDS_ENUM.BODY, dbField = paramName) => async (req, res, next) => {
        try {
            const searchValue = req[searchIn][paramName];

            const car = await Car.findOne({ [dbField]: searchValue });

            req.car = car;

            next();
        } catch (e) {
            next(e);
        }
    }
};
