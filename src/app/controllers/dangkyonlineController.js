const dangkyon = require('../models/dangkyonline')
const dkonskdb = require('../models/makhuyenmai')
const { mutipleMongooseToObject } = require('../../util/mongoose')

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
            discount: 20,
            quantity: c,
            status: true
        })
        
        magiamgia.save()
        dkonline.save().then(() => {
            res.redirect("/")
        })
    }


    index(req, res){
        res.render('home')
    }
}

module.exports = new DangkyonlineController