const { Car } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorsHandler');
const StatusCodesEnum = require('../configs/statusCodesENUM');
const { carValidator } = require('../validators');

module.exports = {
    isCarExists: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Car.findById(car_id);

            if (!car) {
                throw new ErrorHandler(StatusCodesEnum.NOT_FOUND, 'No such car found.');
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
                throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, 'Bad data.');
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
                throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, 'Bad data.');
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }
};
