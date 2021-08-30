const router = require('express').Router();
const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.post('/',
    carMiddleware.isCreateCarDataValid,
    carController.createCar);

router.get('/', carController.getAllCars);

router.delete('/:car_id',
    carMiddleware.isCarExists,
    carController.deleteCar);

router.get('/:car_id',
    carMiddleware.isCarExists,
    carController.getCarById);

router.put('/:car_id',
    carMiddleware.isUpdateCarDataValid,
    carMiddleware.isCarExists,
    carController.updateCar);

module.exports = router;
