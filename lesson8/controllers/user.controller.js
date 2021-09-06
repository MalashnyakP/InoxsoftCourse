const { User } = require('../dataBase');
const { userUtil } = require('../utils');

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
            const users = await User.find({}).select('-password -__v');

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            const userById = await User.findById(user_id);

            res.json(userUtil.userNormalizator(userById));
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const { ...userData } = req.body;

            const updatedUser = await User.findByIdAndUpdate({ _id: user_id }, { ...userData }, { new: true });

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
};
