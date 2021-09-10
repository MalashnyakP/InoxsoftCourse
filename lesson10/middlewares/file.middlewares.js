const ErrorHandler = require('../errors/ErrorsHandler');
const { CONSTANTS, STATUS_CODES } = require('../configs');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            const { avatar } = req.files;

            if (!avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = avatar;

            if (!CONSTANTS.FILES_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, `File ${name} has wrong format.`);
            }

            if (size > CONSTANTS.MAX_IMG_SIZE) {
                throw new ErrorHandler(STATUS_CODES.BAD_REQUEST, `File ${name} size is too big.`);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
