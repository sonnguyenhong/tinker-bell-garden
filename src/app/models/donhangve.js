const mongoose = require('mongoose')
const { Schema } = mongoose

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
    type: {
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