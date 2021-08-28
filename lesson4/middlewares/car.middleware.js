const { Car } = require('../dataBase');
const ErrorHandler = require('../errors/ErrorsHandler');
const StatusCodesEnum = require('../configs/statusCodesENUM');

module.exports = {
    isDataCorrect: (req, res, next) => {
        try {
            const { model, year } = req.body;
            if (!model || !year) {
                throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, 'Bad data.');
            }

            req.body.model = model.trim();

            next();
        } catch (e) {
            next(e);
        }
    },

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

    isYearValid: (req, res, next) => {
        try {
            const { year } = req.body;
            if (year < 1980 || year > 2022) {
                throw new ErrorHandler(StatusCodesEnum.BAD_REQUEST, 'Given year isn\'t valid.');
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
