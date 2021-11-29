const mongoose = require('mongoose')
const { Schema } = mongoose

const veSchema = new Schema({
    code: {
        type: String,
        required
    },
    type: {
        type: String,
        required
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Ve', veSchema)