const mongoose = require('mongoose')
const { Schema } = mongoose

const veSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    isPlaying: {
        type: Boolean,
        required: true,
        default: false,
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