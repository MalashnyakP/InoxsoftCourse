const fs = require('fs');
const path = require('path');
const util = require('util');

const { passwordService } = require('../services');
const { userValidator } = require('../validators');

const { User } = require('../dataBase');

const createFirstAdmin = async () => {
    try {
        const readFilePromisify = util.promisify(fs.readFile);
        const unlinkPromisify = util.promisify(fs.unlink);

        const defAdminPath = path.join(process.cwd(), 'configs', 'admin.json');

        if (!fs.existsSync(defAdminPath)) {
            throw new Error('No file under such path.');
        }

        readFilePromisify(defAdminPath).then(async (user) => {
            const userJson = JSON.parse(user);

            const { error, value } = userValidator.createUserValidator.validate(userJson);

            if (error) {
                throw new Error(error.details[0].message);
            }
            const isUserExists = await User.findOne({ email: value.email });

            if (isUserExists) {
                throw new Error('User with this id already exists.');
            }

            const pass = await passwordService.hash(value.password);
            value.password = pass;

            await User.create(value);
        });

        await unlinkPromisify(defAdminPath);
    } catch (e) {
        console.log(e.message);
    }
};

module.exports = {
    createFirstAdmin
};
