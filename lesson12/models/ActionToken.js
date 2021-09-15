const { Schema, model } = require('mongoose');

const { databaseTableEnum } = require('../configs');

const ActionTokenSchema = new Schema({
    action_token: {
        type: String,
        required: true
    },
    [databaseTableEnum.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: databaseTableEnum.USER
    }
}, { timestamps: true });

module.exports = model(databaseTableEnum.ACTION_TOKEN, ActionTokenSchema);
