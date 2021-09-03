const { Schema, model } = require('mongoose');

const { databaseTableEnum } = require('../configs');

const carSchema = new Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    },
    [databaseTableEnum.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: databaseTableEnum.USER
    }
}, { timestamps: true });

module.exports = model('car', carSchema);
