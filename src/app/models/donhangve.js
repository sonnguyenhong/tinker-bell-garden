const mongoose = require('mongoose');
const khachhangvip = require('../models/khachhangvip');
const { Schema } = mongoose
const Khachhangvip = require('../models/khachhangvip')
const donhangveSchema = new Schema({
    phoneNum: {
        type: String
    },
    discountCode: {
        type: String,
        ref: 'Makhuyenmai'
    },
    price: {
        type: Number,
        required : true,
    },
    typeTicket: {
        type: String,
    },
}, {
    timestamps: true
})

donhangveSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
      this.created_at = now;
    }
    next();
  });
module.exports = mongoose.model('Donhangve', donhangveSchema)