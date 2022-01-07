const mongoose = require('mongoose')
 const Donhangve = require('../../app/models/donhangve')
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
    //     phoneNum: '0328020155',
    //     discountCode: '',
    //     price: 200000,
    //     typeTicket: 'day' 
    // }
    // const donhangve = new Donhangve(user);
    // donhangve.save();

}

module.exports = { connect }