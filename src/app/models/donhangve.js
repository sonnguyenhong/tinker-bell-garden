const mongoose = require('mongoose')
const { Schema } = mongoose

const donhangveSchema = new Schema({
    ticketType: {
        type: Number,
        required: true
    },
    phoneNum: {
        type: String
    },
    discountCode: {
        type: String,
        ref: 'Makhuyenmai'
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Donhangve', donhangveSchema)