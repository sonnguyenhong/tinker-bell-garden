const mongoose = require('mongoose')
const { Schema } = mongoose

const cosovatchatSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    khuvuichoi: {
        type: Schema.Types.ObjectId,
        ref: 'Khuvuichoi'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cosovatchat', cosovatchatSchema)