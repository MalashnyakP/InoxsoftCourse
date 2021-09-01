const Joi = require('joi');
const { CONSTANTS } = require('../configs');

const createCarValidator = Joi.object({
    model: Joi
        .string()
        .trim()
        .required(),

    year: Joi
        .number()
        .integer()
        .min(CONSTANTS.CURRENT_YEAR - 20).max(CONSTANTS.CURRENT_YEAR)
        .required()
});

const updateCarValidator = Joi.object({
    model: Joi
        .string()
        .trim(),

    year: Joi
        .number()
        .integer()
        .min(CONSTANTS.CURRENT_YEAR - 20).max(CONSTANTS.CURRENT_YEAR)
});

const carIdValidator = Joi.object({
    car_id: Joi
        .string()
        .trim()
        .min(24).max(24)
        .required()
});

module.exports = {
    carIdValidator,
    createCarValidator,
    updateCarValidator
};
