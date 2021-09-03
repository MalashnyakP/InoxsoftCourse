const { Car } = require('../dataBase');
const { carValidator } = require('../validators');
const ErrorHandler = require('../errors/ErrorsHandler');
const { STATUS_CODES } = require('../configs');

module.exports = {
    isCarIdValid: (req, res, next) => {
        try {
            const { error } = carValidator.carIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
            }

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

    isCreateCarDataValid: (req, res, next) => {
        try {
            const { error, value } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    isUpdateCarDataValid: (req, res, next) => {
        try {
            const { error, value } = carValidator.updateCarValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },

    getCarByDynamicParm: (paramName, searchIn = 'body', dbField = paramName) => async (req, res, next) => {
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
