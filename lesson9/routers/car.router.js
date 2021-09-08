const router = require('express').Router();

const { carController } = require('../controllers');
const { authMiddleware, carMiddleware } = require('../middlewares');
const { VALIDATORS_ENUM, REQ_FIELDS_ENUM } = require('../configs');

router.post('/',
    carMiddleware.validateDataDynamic(VALIDATORS_ENUM.CREATE_CAR),
    authMiddleware.checkToken(),
    carController.createCar);

router.get('/', carController.getAllCars);

router.get('/owned',
    authMiddleware.checkToken(),
    carController.getAllCarsOwnedByUser);

router.use('/:car_id',
    carMiddleware.validateDataDynamic(VALIDATORS_ENUM.CAR_ID, REQ_FIELDS_ENUM.PARAMS),
    carMiddleware.getCarByDynamicParm('car_id', REQ_FIELDS_ENUM.PARAMS, '_id'),
    carMiddleware.isCarExists);

router.delete('/:car_id',
    carMiddleware.validateDataDynamic(VALIDATORS_ENUM.CAR_ID, REQ_FIELDS_ENUM.PARAMS),
    authMiddleware.checkToken(),
    carController.deleteCar);

router.get('/:car_id',
    carMiddleware.validateDataDynamic(VALIDATORS_ENUM.CAR_ID, REQ_FIELDS_ENUM.PARAMS),
    carController.getCarById);

router.put('/:car_id',
    carMiddleware.validateDataDynamic(VALIDATORS_ENUM.CAR_ID, REQ_FIELDS_ENUM.PARAMS),
    carMiddleware.validateDataDynamic(VALIDATORS_ENUM.UPDATE_CAR),
    authMiddleware.checkToken(),
    carController.updateCar);

module.exports = router;
