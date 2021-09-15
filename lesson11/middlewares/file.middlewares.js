const { ErrorHandler } = require('../errors');
const { CONSTANTS, errors: { BAD_REQUEST: { WRONG_FILE_FORMAT, FILE_SIZE } } } = require('../configs');

module.exports = {
    checkUserAvatar: (req, res, next) => {
        try {
            if (!req.files || !req.files.avatar) {
                next();
                return;
            }

            const { name, size, mimetype } = req.files.avatar;

            if (!CONSTANTS.FILES_MIMETYPES.includes(mimetype)) {
                throw new ErrorHandler(WRONG_FILE_FORMAT.status_code, WRONG_FILE_FORMAT.custom_code, WRONG_FILE_FORMAT.msg, name);
            }

            if (size > CONSTANTS.MAX_IMG_SIZE) {
                throw new ErrorHandler(FILE_SIZE.status_code, FILE_SIZE.custom_code, FILE_SIZE.msg, name);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
