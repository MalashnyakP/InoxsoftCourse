const router = require('express').Router();
const { carController } = require('../controllers');
const { carMiddleware } = require('../middlewares');

router.post('/',
    carMiddleware.isCreateCarDataValid,
    carController.createCar);

router.get('/', carController.getAllCars);

router.use('/:car_id',
    carMiddleware.isCarIdValid,
    carMiddleware.getCarByDynamicParm('car_id', 'params', '_id'),
    carMiddleware.isCarExists);

router.delete('/:car_id',
    carController.deleteCar);

router.get('/:car_id',
    carController.getCarById);

router.put('/:car_id',
    carMiddleware.isUpdateCarDataValid,
    carController.updateCar);

module.exports = router;
