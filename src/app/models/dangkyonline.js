const mongoose = require('mongoose')
const { Schema } = mongoose

const dangkyonlineSchema = new Schema({
    name: {
        type: String,
        required
    },
    email: {
        type: String,
        required
    },
    phoneNum: {
        type: String,
        required
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