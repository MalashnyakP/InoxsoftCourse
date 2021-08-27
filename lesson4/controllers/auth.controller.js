const { User } = require('../dataBase');
const StatusCodesEnum = require('../configs/statusCodesENUM');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const user = await User.create(req.body);

            res.status(StatusCodesEnum.CREATED).json(user);
        } catch (e) {
            next(e);
        }
    },

    signIn: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            res.status(StatusCodesEnum.OK).json(userByEmail);
        } catch (e) {
            next(e);
        }
    }
};
