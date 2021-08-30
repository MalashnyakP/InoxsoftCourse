const router = require('express').Router();
const {
    createCar, deleteCar, getAllCars, getCarById, updateCar
} = require('../controllers/car.controller');
const { isCarExists, isDataCorrect, isYearValid } = require('../middlewares/car.middleware');

router.post('/', isDataCorrect, isYearValid, createCar);
router.get('/', getAllCars);
router.delete('/:car_id', isCarExists, deleteCar);
router.get('/:car_id', isCarExists, getCarById);
router.put('/:car_id', isDataCorrect, isYearValid, isCarExists, updateCar);

module.exports = router;
