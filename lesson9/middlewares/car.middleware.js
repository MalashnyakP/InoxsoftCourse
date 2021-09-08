const { Car } = require('../dataBase');
const { carValidator } = require('../validators');
const ErrorHandler = require('../errors/ErrorsHandler');
const { STATUS_CODES, REQ_FIELDS_ENUM } = require('../configs');

module.exports = {
    validateDataDynamic: (validatorName, dataIn = REQ_FIELDS_ENUM.BODY) => (req, res, next) => {
        try {
            const { error, value } = carValidator[validatorName].validate(req[dataIn]);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
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
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, 'No car found.');
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
console.log(carOwnedByUser);
            if (!carOwnedByUser) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, 'This car isn\'t owned by this user.');
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
