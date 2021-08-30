const { Car } = require('../dataBase');
const StatusCodesEnum = require('../configs/statusCodesENUM');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const car = await Car.create(req.body);

            res.status(StatusCodesEnum.CREATED).json(car);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await Car.deleteOne(car_id);

            res.status(StatusCodesEnum.DELETED).json('Car deleted succesfully.');
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            await Car.find().then((car) => {
                res.json(car);
            });
        } catch (e) {
            next(e);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const userById = await Car.findById(user_id);

            res.status(StatusCodesEnum.OK).json(userById);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const updatedUser = await Car.findOneAndUpdate(userId, req.body);

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
};
