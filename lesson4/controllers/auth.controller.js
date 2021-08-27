const { User } = require('../dataBase');

module.exports = {
    signUp: async (req, res, next) => {
        try {
            const user = await User.create(req.body);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    signIn: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            res.status(200).json(userByEmail);
        } catch (e) {
            next(e);
        }
    }
};
