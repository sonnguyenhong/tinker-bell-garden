const mongoose = require('mongoose')
const { Schema } = mongoose
const CSVC = require('./cosovatchat');

const khuvuichoiSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    CSVC: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Cosovatchat'
        }
    ]
}, {
    timestamps: true
})

khuvuichoiSchema.post('findOneAndDelete', async(khuvuichoi) => {
    // console.log('ayy');
    await CSVC.deleteMany({
        _id: {
            $in: khuvuichoi.CSVC
        }
    })
})


module.exports = mongoose.model('Khuvuichoi', khuvuichoiSchema)