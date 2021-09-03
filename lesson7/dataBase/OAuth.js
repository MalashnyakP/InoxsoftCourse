const { Schema, model } = require('mongoose');

const { databaseTableEnum } = require('../configs');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    [databaseTableEnum.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: databaseTableEnum.USER
    }
}, { timestamps: true });

module.exports = model(databaseTableEnum.OAUTH, OAuthSchema);
