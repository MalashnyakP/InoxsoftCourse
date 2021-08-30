const { Car } = require('../dataBase');

module.exports = {
    createCar: async (req, res, next) => {
        try {
            const car = await Car.create(req.body);

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;

            await Car.findByIdAndDelete(car_id);

            res.json({ message: 'Car deleted succesfully.' });
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
            const { car_id } = req.params;

            const carById = await Car.findById(car_id);

            res.json(carById);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const { ...carData } = req.body;

            await Car.findByIdAndUpdate(car_id, carData);

            res.json({ message: 'Car updated.' });
        } catch (e) {
            next(e);
        }
    }
};
