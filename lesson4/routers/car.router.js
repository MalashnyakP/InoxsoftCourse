const router = require('express').Router();
const {
    createCar, deleteCar, getAllCars, getCarById, updateCar
} = require('../controllers/car.controller');
const { isCarExists, isYearValid } = require('../middlewares/car.middleware');

router.post('/', isYearValid, createCar);
router.get('/', getAllCars);
router.delete('/:car_id', isCarExists, deleteCar);
router.get('/:car_id', isCarExists, getCarById);
router.put('/:car_id', isYearValid, isCarExists, updateCar);

module.exports = router;
