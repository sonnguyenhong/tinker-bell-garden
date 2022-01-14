const mongoose = require('mongoose')
 const Donhangve = require('../../app/models/donhangve')
 const Donhang = require('../../app/models/donhang')
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

    // var db = mongoose.connection;
    // const user = {
    //     phoneNum: '0967874928',
    //     discountCode: '',
    //     price: 100000,
    //     typeTicket: 'hour' 
    // }
    //const donhangve = new Donhangve();

}

module.exports = { connect }