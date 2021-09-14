module.exports = {
    BAD_REQUEST: {

        FILE_SIZE: {
            msg: 'File size is too big.',
            status_code: 400,
            custom_code: 4008
        },

        LOG_IN: {
            msg: 'Email or password is wrong.',
            status_code: 400,
            custom_code: 4009
        },

        NOT_OWNED_BY_USER: {
            msg: 'This car isn\'t owned by this user.',
            status_code: 400,
            custom_code: 4006
        },

        PASSWORDS_DONT_MATCH: {
            msg: 'Passwords don\'t match.',
            status_code: 400,
            custom_code: 4003
        },

        PASSWORD_INVALID: {
            msg: 'Passwords isn\'t valid.',
            status_code: 400,
            custom_code: 4002
        },

        VALIDATION: {
            status_code: 400,
            custom_code: 4005
        },

        WRONG_FILE_FORMAT: {
            msg: 'File has wrong format.',
            status_code: 400,
            custom_code: 4007
        },

        WRONG_TEMPLATE: {
            msg: 'Wrong email template.',
            status_code: 400,
            custom_code: 4009
        }
    },

    CONFLICT: {
        USER_CONFLICT: {
            msg: 'User with this email already exists.',
            status_code: 409,
            custom_code: 40901
        },
    },

    FORBIDDEN: {
        USER_ACTIVE: {
            msg: 'User not activated.',
            status_code: 403,
            custom_code: 40302
        },
        USER_FORBIDDEN: {
            msg: 'This user role forbiden from this action.',
            status_code: 403,
            custom_code: 40301
        },

    },

    UNAUTHORIZED: {
        INVALID_TOKEN: {
            msg: 'Invalid token.',
            status_code: 401,
            custom_code: 40101
        }
    },

    NOT_FOUND: {
        CAR_NF: {
            msg: 'No car found.',
            status_code: 404,
            custom_code: 40402
        },

        USER_NF: {
            msg: 'No user found.',
            status_code: 404,
            custom_code: 40401
        },
    }
};
