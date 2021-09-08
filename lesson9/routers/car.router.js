const router = require('express').Router();
const { carController } = require('../controllers');
const { authMiddleware, carMiddleware } = require('../middlewares');

router.post('/',
    carMiddleware.isCreateCarDataValid,
    authMiddleware.checkToken(),
    carController.createCar);

router.get('/', carController.getAllCars);

router.get('/owned',
    authMiddleware.checkToken(),
    carController.getAllCarsOwnedByUser);

router.use('/:car_id',
    carMiddleware.isCarIdValid,
    carMiddleware.getCarByDynamicParm('car_id', 'params', '_id'),
    carMiddleware.isCarExists);

router.delete('/:car_id',
    authMiddleware.checkToken(),
    carController.deleteCar);

router.get('/:car_id',
    carController.getCarById);

router.put('/:car_id',
    carMiddleware.isUpdateCarDataValid,
    authMiddleware.checkToken(),
    carController.updateCar);

module.exports = router;
