const mongoose = require('mongoose')
const { Schema } = mongoose

const khachhangvipSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    points: {
        type: Number,
        required: true,
    },
    regisDate: {
        type: Date,
        required: true,
    },
    lichsu: [{
        type: Schema.Types.ObjectId,
        ref: 'Lichsucapnhat',
        required: true,
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Khachhangvip', khachhangvipSchema)