const mongoose = require('mongoose')
const { Schema } = mongoose

const donhangSchema = new Schema({
    products: [{
        productData: {
            type: Schema.Types.ObjectId,
            ref: 'Mathang',
            required
        },
        quantity: {
            type: Number,
            required
        }
    }],
    price: {
        type: Number,
        required
    },
    hasDiscount: {
        type: Boolean,
        required,
        default: false
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Donhang', donhangSchema)