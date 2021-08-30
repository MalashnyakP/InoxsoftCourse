const { User } = require('../dataBase');

module.exports = {
    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await User.findByIdAndDelete(user_id);

            res.json({ message: 'User deleted succesfully.' });
        } catch (e) {
            next(e);
        }
    },

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
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { ...userData } = req.body;

            await User.findByIdAndUpdate(user_id, userData);

            res.json({ message: 'User updated' });
        } catch (e) {
            next(e);
        }
    }
};
