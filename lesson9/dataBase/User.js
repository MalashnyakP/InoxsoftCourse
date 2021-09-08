const { Schema, model } = require('mongoose');

const {
    databaseTableEnum, USER_ROLE, USER_STATES, config
} = require('../configs');
const passwordService = require('../services/password.service');

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        default: USER_STATES.ACTIVE,
        enum: Object.values(USER_STATES),
        trim: true
    },
    role: {
        type: String,
        default: USER_ROLE.USER,
        enum: Object.values(USER_ROLE)
    }
}, { timestamps: true });

userSchema.statics = {
    async createUserWithHashPass(user) {
        const hashPassword = await passwordService.hash(user.password);

        return this.create({ ...user, password: hashPassword });
    }
};

const User = model(databaseTableEnum.USER, userSchema);

User.countDocuments({ role: USER_ROLE.ADMIN }, async (err, count) => {
    if (count) {
        return;
    }
    const hashPassword = await passwordService.hash(config.FIRST_ADMIN_PASSWORD);

    await User.create({
        email: config.FIRST_ADMIN_EMAIL, password: hashPassword, name: config.FIRST_ADMIN_NAME, role: USER_ROLE.ADMIN
    });
});

module.exports = User;
