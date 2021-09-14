const { Car } = require('../dataBase');
const { carService: { carSearchQuery } } = require('../services');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const { current_user } = req;

            const car = await Car.create({ ...req.body, user: current_user._id });

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { current_user, params: { car_id } } = req;

            await Car.findByIdAndDelete({ _id: car_id, user: current_user._id });

            res.json({ message: 'Car deleted succesfully.' });
        } catch (e) {
            next(e);
        }
    },

    getCars: async (req, res, next) => {
        try {
            const result = await carSearchQuery(req.query);

            res.json(result);
        } catch (e) {
            next(e);
        }
    },

    getAllCarsOwnedByUser: async (req, res, next) => {
        try {
            const { current_user } = req;

            const cars = await Car.find({ user: current_user._id });

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getCarById: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            const carById = await Car.findById(car_id);

            res.json(carById);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { current_user: { _id }, params: { car_id }, body: { ...carData } } = req;

            const updatedCar = await Car.findByIdAndUpdate({ _id: car_id, user: _id }, { ...carData }, { new: true });

            res.json(updatedCar);
        } catch (e) {
            next(e);
        }
    }
};
