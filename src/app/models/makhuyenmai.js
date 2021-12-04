const mongoose = require('mongoose')
const { Schema } = mongoose

const makhuyenmaiSchema = new Schema({
    code: {
        type: String,
        required
    },
    discount: {
        type: Number,
        required
    },
    status: {
        type: Boolean,
        required
    },
    quantity: {
        type: Number,
        required
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Makhuyenmai', makhuyenmaiSchema)