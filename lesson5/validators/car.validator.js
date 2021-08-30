const Joi = require('joi');
const { CURRENT_YEAR } = require('../configs/constants');

const createCarValidator = Joi.object({
    model: Joi
        .string()
        .trim()
        .required(),

    year: Joi
        .number()
        .integer()
        .min(2021 - 20).max(2021)
        .required()
});

const updateCarValidator = Joi.object({
    model: Joi
        .string()
        .trim(),

    year: Joi
        .number()
        .integer()
        .min(CURRENT_YEAR - 20).max(2021)
});

module.exports = {
    createCarValidator,
    updateCarValidator
};
