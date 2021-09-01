const Joi = require('joi');
const { CONSTANTS, USER_ROLE } = require('../configs');

const createUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3).max(30)
        .trim()
        .required(),

    email: Joi
        .string()
        .trim()
        .regex(CONSTANTS.EMAIL_REGEX)
        .required(),

    password: Joi
        .string()
        .min(8).max(128)
        .trim()
        .regex(CONSTANTS.PASSWORD_REGEX)
        .required(),

    role: Joi
        .string()
        .allow(...Object.values(USER_ROLE))
});

const userIdValidator = Joi.object({
    user_id: Joi
        .string()
        .trim()
        .min(24).max(24)
        .required()
});

const updateUserValidator = Joi.object({
    name: Joi
        .string()
        .alphanum()
        .min(3).max(30)
        .trim(),

    email: Joi
        .string()
        .trim()
        .regex(CONSTANTS.EMAIL_REGEX),

    password: Joi
        .string()
        .min(8).max(128)
        .trim()
        .regex(CONSTANTS.PASSWORD_REGEX),

    role: Joi
        .string()
        .allow(...Object.values(USER_ROLE))
});

const logInUserValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .regex(CONSTANTS.EMAIL_REGEX),

    password: Joi
        .string()
        .trim()
        .min(8).max(128)
        .regex(CONSTANTS.PASSWORD_REGEX)
});

module.exports = {
    createUserValidator,
    logInUserValidator,
    updateUserValidator,
    userIdValidator
};
