const Joi = require('joi');
const { CONSTANTS, USER_ROLE, USER_STATES } = require('../configs');

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

    state: Joi
        .string()
        .allow(...Object.values(USER_STATES)),

    role: Joi
        .string()
        .allow(...Object.values(USER_ROLE))
});

const userIdValidator = Joi.object({
    user_id: Joi
        .string()
        .trim()
        .regex(CONSTANTS.MONGO_BD_ID)
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

    state: Joi
        .string()
        .allow(...Object.values(USER_STATES)),

    role: Joi
        .string()
        .allow(...Object.values(USER_ROLE))
});

const setUserDataValidator = Joi.object({
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

    password_repeat: Joi
        .string()
        .min(8).max(128)
        .trim()
        .regex(CONSTANTS.PASSWORD_REGEX),

    state: Joi
        .string()
        .allow(...Object.values(USER_STATES)),

    role: Joi
        .string()
        .allow(...Object.values(USER_ROLE))
});

const logInUserValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .regex(CONSTANTS.EMAIL_REGEX)
        .required(),

    password: Joi
        .string()
        .trim()
        .min(8).max(128)
        .regex(CONSTANTS.PASSWORD_REGEX)
        .required()
});

const userEmailValidator = Joi.object({
    email: Joi
        .string()
        .trim()
        .regex(CONSTANTS.EMAIL_REGEX)
        .required()
});

module.exports = {
    createUserValidator,
    logInUserValidator,
    updateUserValidator,
    userIdValidator,
    userEmailValidator,
    setUserDataValidator
};
