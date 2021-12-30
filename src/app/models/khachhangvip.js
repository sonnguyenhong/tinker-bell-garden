const mongoose = require('mongoose')
const { Schema } = mongoose

const khachhangvipSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    points: {
        type: Number,
        required: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Khachhangvip', khachhangvipSchema)