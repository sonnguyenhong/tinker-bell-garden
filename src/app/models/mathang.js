const mongoose = require('mongoose')
const { Schema } = mongoose

const mathangSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Mathang', mathangSchema)