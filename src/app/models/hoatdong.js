const mongoose = require('mongoose')
const { Schema } = mongoose

const hoatdongSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    startDate: {
        type: Date,
        required:true
    },
    endDate: {
        type: Date,
        required:true
    },
    eventInfo: {
        type: String,
        required:true
    },
    numberOfDiscountCode: {
        type: Number,
        required:true
    },

    currentNumofDiscountCode:{
        type: Number,
        default: 0
    },

    discount: {
        type: Number,
        required:true
    },
    imageUrl: {
        type: String,
        required:true
    },
    discountCode: [{
        type: Schema.Types.ObjectId,
        ref: 'Makhuyenmai',
        // required:true
    }]
}, {
    timestamps: true
})

hoatdongSchema.post('save', function(hoatdong){
    hoatdong.currentNumofDiscountCode = hoatdong.numberOfDiscountCode
})

module.exports = mongoose.model('Hoatdong', hoatdongSchema)