const mongoose = require('mongoose')
const { Schema } = mongoose

const lichsucapnhatSchema = new Schema({
    updateAt: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    oldName: {
        type: String,
    },
    newName: {
        type: String,
    },
    oldAddress: {
        type: String,
    },
    newAddress: {
        type: String,
    },
    oldPoints: {
        type: Number,
    },
    newPoints: {
        type: Number,
    },
    oldExpiryDate: {
        type: Date,
    },
    newExpiryDate: {
        type: Date,
    },
    describe: {
        type: String,
        required: true
    },
    khachhang: {
        type: Schema.Types.ObjectId,
        ref: 'Khachhangvip',
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Lichsucapnhat', lichsucapnhatSchema)