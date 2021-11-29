const mongoose = require('mongoose')
const { Schema } = mongoose

const khuvuichoiSchema = new Schema({
    name: {
        type: String,
        required
    },
    activity: {
        type: String
    },
    cosovatchat: [{
        type: Schema.Types.ObjectId,
        ref: 'Cosovatchat'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Khuvuichoi', khuvuichoiSchema)