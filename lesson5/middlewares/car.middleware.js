const { Car } = require('../dataBase');
const { carValidator } = require('../validators');
const ErrorHandler = require('../errors/ErrorsHandler');
const { STATUS_CODES } = require('../configs');

module.exports = {
    isCarExists: async (req, res, next) => {
        try {
            const { value, error } = carValidator.carIdValidator.validate(req.params);

            if (error) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, error.details[0].message);
            }

            const car = await Car.findById(value.car_id);

            if (!car) {
                throw new ErrorHandler(STATUS_CODES.NOT_FOUND, 'No such car found.');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

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
    }
};
