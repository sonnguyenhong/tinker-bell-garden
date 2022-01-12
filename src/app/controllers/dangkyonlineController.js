const dangkyon = require('../models/dangkyonline')
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

    index(req, res){
        res.render('home')
    }
}

module.exports = new DangkyonlineController