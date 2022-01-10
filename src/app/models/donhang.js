const mongoose = require('mongoose')
const { Schema } = mongoose

const donhangSchema = new Schema({
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Mathang',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    price: {
        type: Number,
        required: true
    },
    hasDiscount: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Donhang', donhangSchema)