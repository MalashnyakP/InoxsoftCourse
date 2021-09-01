const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    model: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = model('car', carSchema);
