const mongoose = require('mongoose')

async function connect() {

    try {
        await mongoose.connect('mongodb+srv://tinkerbellgarden:congnghephanmem@cluster0.nbrpb.mongodb.net/tinkerbellgarden?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected successfully')
    } catch (err) {
        console.log('Connected Failed')
    }

}

module.exports = { connect }