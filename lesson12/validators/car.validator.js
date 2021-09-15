const Joi = require('joi');

const { CONSTANTS } = require('../configs');

const createCarValidator = Joi.object({
    brand: Joi
        .string()
        .trim()
        .required(),

    model: Joi
        .string()
        .trim()
        .required(),

    price: Joi
        .number()
        .integer()
        .required(),

    year: Joi
        .number()
        .integer()
        .min(CONSTANTS.CURRENT_YEAR - 20).max(CONSTANTS.CURRENT_YEAR)
        .required()
});

const updateCarValidator = Joi.object({
    brand: Joi
        .string()
        .trim(),

    model: Joi
        .string()
        .trim(),

    price: Joi
        .number()
        .integer(),

    year: Joi
        .number()
        .integer()
        .min(CONSTANTS.CURRENT_YEAR - 20).max(CONSTANTS.CURRENT_YEAR)
});

const carIdValidator = Joi.object({
    car_id: Joi
        .string()
        .trim()
        .regex(CONSTANTS.MONGO_BD_ID)
        .required()
});

module.exports = {
    carIdValidator,
    createCarValidator,
    updateCarValidator
};
