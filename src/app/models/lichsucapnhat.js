const mongoose = require('mongoose')
const { Schema } = mongoose

const lichsucapnhatSchema = new Schema({
    updatedDate: {
        type: Date,
        required
    },
    information: {
        type: String,
        required
    },
    oldInfor: {
        type: String,
        required
    },
    updatedInfo: {
        type: String,
        required
    },
    khachhang: {
        type: Schema.Types.ObjectId,
        ref: 'Khachhangvip',
        required
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Lichsucapnhat', lichsucapnhatSchema)