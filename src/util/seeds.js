const db = require('../config/db/index');
const KhuVuiChoi = require('../app/models/khuvuichoi');
const CSVC = require('../app/models/cosovatchat');
const mongoose = require('mongoose');
db.connect();
async function createKhuVuiChoi() {
    await new KhuVuiChoi({
        name: "tuandz" + Math.floor(Math.random() * 100),
        description: 'Di hoc'
    }).save().then(khuvuichoi => {
        console.log(khuvuichoi)
    });
}
KhuVuiChoi.deleteMany({}).then(async () => {
    for (let i = 1; i <= 10; i++) {
         await createKhuVuiChoi();
    }
    await CSVC.deleteMany({});
})
