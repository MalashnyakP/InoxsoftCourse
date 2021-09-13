const { Car } = require('../dataBase');
const { queryUtils } = require('../utils');

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

    getAllCars: async (req, res, next) => {
        try {
            const { limit = 5, page = 1 } = req.query;

            const filter = queryUtils.buildCarSearchFilter(req.query);

            const cars = await Car.find(filter).limit(+limit).skip(limit * (page - 1));

            res.json(cars);
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
