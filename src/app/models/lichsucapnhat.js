const mongoose = require('mongoose')
const { Schema } = mongoose

const lichsucapnhatSchema = new Schema({
    updateAt: {
        type: String,
        required: true
    },
    oldName: {
        type: String,
    },
    newName: {
        type: String,
        required: true
    },
    oldAddress: {
        type: String,
    },
    newAddress: {
        type: String,
        required: true
    },
    oldPoints: {
        type: Number,
    },
    newPoints: {
        type: Number,
        required: true
    },
    oldExpiryDate: {
        type: Date,
    },
    newExpiryDate: {
        type: Date,
        required: true
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