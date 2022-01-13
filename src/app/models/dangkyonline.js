const mongoose = require('mongoose')
const { Schema } = mongoose

const dangkyonlineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNum: {
        type: String,
        required: true
    },
    numberOfTwoHoursTicket: {
        type: Number
    },
    numberOfUnlimitedTicket: {
        type: Number
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Dangkyonline', dangkyonlineSchema)