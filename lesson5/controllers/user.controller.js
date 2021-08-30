const { User } = require('../dataBase');
const StatusCodesEnum = require('../configs/statusCodesENUM');

module.exports = {
    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;

            await User.deleteOne({ _id: user_id });

            res.status(StatusCodesEnum.DELETED).json('User deleted succesfully.');
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

            res.status(StatusCodesEnum.OK).json(userById);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { userId } = req.params;

            const updatedUser = await User.findOneAndUpdate(userId, req.body);

            res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    }
};
