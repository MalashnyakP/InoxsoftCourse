const Joi = require('joi');
const userRolesEnum = require('../configs/user-role.enum');
const { EMAIL_REGEX, PASSWORD_REGEX } = require('../configs/constants');

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
        .regex(EMAIL_REGEX)
        .required(),

    password: Joi
        .string()
        .min(8).max(128)
        .trim()
        .regex(PASSWORD_REGEX)
        .required(),

    role: Joi
        .string()
        .allow(...Object.values(userRolesEnum))
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
        .regex(EMAIL_REGEX),

    password: Joi
        .string()
        .min(8).max(128)
        .trim()
        .regex(PASSWORD_REGEX),

    role: Joi
        .string()
        .allow(...Object.values(userRolesEnum))
});

const logInUserValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .regex(EMAIL_REGEX),

    password: Joi
        .string()
        .trim()
        .min(8).max(128)
        .regex(PASSWORD_REGEX)
});

module.exports = {
    createUserValidator,
    logInUserValidator,
    updateUserValidator
};
