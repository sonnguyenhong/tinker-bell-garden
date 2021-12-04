const mongoose = require('mongoose')
const { Schema } = mongoose

const cosovatchatSchema = new Schema({
    name: {
        type: String,
        required
    },
    code: {
        type: Number,
        required
    },
    status: {
        type: String,
        required
    },
    imageUrl: {
        type: String,
        required
    },
    khuvuichoi: {
        type: Schema.Types.ObjectId,
        ref: 'Khuvuichoi'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cosovatchat', cosovatchatSchema)