const dangkyon = require('../models/dangkyonline')
const dkonskdb = require('../models/makhuyenmai')
const sukien = require('../models/hoatdong')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { events } = require('../models/dangkyonline')

class DangkyonlineController{
    store(req, res, next){
        const dkonline = new dangkyon({
            name: req.body.name,
            email: req.body.email,
            phoneNum: req.body.phoneNum,
            numberOfTwoHoursTicket: req.body.numberOfTwoHoursTicket,
            numberOfUnlimitedTicket: req.body.numberOfUnlimitedTicket
        })
        dkonline.save().then(() => {
            res.redirect("/")
        })
    }

    store2(req, res, next){
        const dkonline = new dangkyon({
            name: req.body.name,
            email: req.body.email,
            phoneNum: req.body.phoneNum,
            numberOfTwoHoursTicket: req.body.numberOfTwoHoursTicket,
            numberOfUnlimitedTicket: req.body.numberOfUnlimitedTicket
        })

        var a = parseInt(req.body.numberOfTwoHoursTicket), b = parseInt( req.body.numberOfUnlimitedTicket) , c = a + b
        const magiamgia = new dkonskdb(
            {
            code: req.body.phoneNum,
            discount: red.body.discount,
            quantity: c,
            status: true,
            enddate: req.body.endDate
        })
        
        sukien.find().lean()
        .then(events => {
            events = events.filter(e => {
                return (e.endDate > Date.now() && Date.now() > e.startDate)
            })
            var a = events[0].currentNumofDiscountCode
            sukien.findByIdAndUpdate(events[0]._id, {currentNumofDiscountCode: a + 1},(err,e)=>
            {magiamgia.save()
                dkonline.save().then(() => {
                    res.redirect("/")
                })})
        })

    }

    index(req, res){
        sukien.find().lean()
        .then(events => {
            events = events.filter(e => {
                return (e.endDate > Date.now() && Date.now() > e.startDate)
            })

            var ticNum = []
            ticNum[0] = 0
            for(var i = 0; i < events.length; i++){
                ticNum[i] = Number(events[i].numberOfDiscountCode) - Number(events[i].currentNumofDiscountCode)

            }
            res.render('home', {ticNum})
        })
        
    }

}

module.exports = new DangkyonlineController