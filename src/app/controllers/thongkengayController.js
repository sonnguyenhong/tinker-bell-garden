const donhangve = require('../models/donhangve')

const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')
class thongkengayController {
     // [POST] /admin/thongkengay
    getTicketStats(req, res, next){
        res.send('ok')
    }

     // [GET] /admin/thongkengay
    showTicketStats(req, res, next){
        res.render('thongke/stats')
    }

}

module.exports = new thongkengayController();