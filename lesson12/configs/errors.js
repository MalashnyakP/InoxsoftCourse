const statusCodes = require('./statusCodes.enum');

module.exports = {
    BAD_REQUEST: {
        FILE_SIZE: {
            msg: 'File size is too big.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.8'
        },

        LOG_IN: {
            msg: 'Email or password is wrong.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.9'
        },

        NOT_OWNED_BY_USER: {
            msg: 'This car isn\'t owned by this user.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.6'
        },

        PASSWORDS_DONT_MATCH: {
            msg: 'Passwords don\'t match.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.3'
        },

        PASSWORD_SAME_AS_OLD_ONE: {
            msg: 'Password same as old one.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.2'
        },

        VALIDATION: {
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.5'
        },

        WRONG_FILE_FORMAT: {
            msg: 'File has wrong format.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.7'
        },

        WRONG_TEMPLATE: {
            msg: 'Wrong email template.',
            status_code: statusCodes.BAD_REQUEST,
            custom_code: '400.9'
        }
    },

    CONFLICT: {
        USER_CONFLICT: {
            msg: 'User with this email already exists.',
            status_code: statusCodes.CONFLICT,
            custom_code: '409.1'
        },
    },

    FORBIDDEN: {
        USER_ACTIVE: {
            msg: 'User not activated.',
            status_code: statusCodes.FORBIDDEN,
            custom_code: '403.2'
        },
        USER_FORBIDDEN: {
            msg: 'This user role forbiden from this action.',
            status_code: statusCodes.FORBIDDEN,
            custom_code: '403.1'
        },

    },

    UNAUTHORIZED: {
        INVALID_TOKEN: {
            msg: 'Invalid token.',
            status_code: statusCodes.UNA,
            custom_code: '401.1'
        }
    },

    NOT_FOUND: {
        CAR_NF: {
            msg: 'No car found.',
            status_code: statusCodes.NOT_FOUND,
            custom_code: '404.2'
        },

        USER_NF: {
            msg: 'No user found.',
            status_code: statusCodes.NOT_FOUND,
            custom_code: '404.1'
        },
    }
};
