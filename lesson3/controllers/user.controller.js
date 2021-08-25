const users = require('../dataBase/users.json');

module.exports = {
    getAllUsers: (req, res) => {
        res.render('users', { users });
    },

    getUserById: (req, res) => {
        let { user_id } = req.params;
        user_id--;

        res.render('userCabinet',
            {
                id: users[user_id].id,
                name: users[user_id].name,
                email: users[user_id].email,
                password: users[user_id].password
            });
    }
};
