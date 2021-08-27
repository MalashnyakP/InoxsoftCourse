const { User } = require('../dataBase');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            await User.find().then((user) => {
                res.json(user);
            });
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const userById = await User.findById(user_id);

            res.json(userById);
        } catch (e) {
            next(e);
        }
    }
};
