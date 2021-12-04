const mongoose = require('mongoose')
const { Schema } = mongoose

const hoatdongSchema = new Schema({
    name: {
        type: String,
        required
    },
    startDate: {
        type: Date,
        required
    },
    endDate: {
        type: Date,
        required
    },
    eventInfo: {
        type: String,
        required
    },
    numberOfDiscountCode: {
        type: Number,
        required
    },
    discountCode: [{
        type: Schema.Types.ObjectId,
        ref: 'Makhuyenmai',
        required
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Hoatdong', hoatdongSchema)