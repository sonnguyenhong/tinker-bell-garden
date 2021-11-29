const mongoose = require('mongoose')
const { Schema } = mongoose

const donhangveSchema = new Schema({
    phoneNum: {
        type: String
    },
    discountCode: {
        type: String,
        ref: 'Makhuyenmai'
    },
    price: {
        type: Number,
        required
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Donhangve', donhangveSchema)