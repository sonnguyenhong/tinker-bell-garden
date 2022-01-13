const mongoose = require('mongoose')
const { Schema } = mongoose

const makhuyenmaiSchema = new Schema({
    code: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    enddate: {
        type: Date,
        required:true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Makhuyenmai', makhuyenmaiSchema)