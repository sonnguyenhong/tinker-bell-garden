const mongoose = require('mongoose')
const { Schema } = mongoose

const khachhangvipSchema = new Schema({
    name: {
        type: String,
        required
    },
    phoneNumber: {
        type: String,
        required
    },
    address: {
        type: String,
    },
    email: {
        type: String,
        required
    },
    points: {
        type: Number,
        required
    },
    regisDate: {
        type: Date,
        required
    },
    lichsu: [{
        type: Schema.Types.ObjectId,
        ref: 'Lichsucapnhat',
        required
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Khachhangvip', khachhangvipSchema)