const mongoose = require('mongoose')
const { Schema } = mongoose

const mathangSchema = new Schema({
    name: {
        type: String,
        required
    },
    price: {
        type: Number,
        required
    },
    quantity: {
        type: Number,
        required
    },
    imageUrl: {
        type: String,
        required
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Mathang', mathangSchema)