const dangkyon = require('../models/dangkyonline')
const dkonskdb = require('../models/makhuyenmai')
const sukien = require('../models/hoatdong')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { events } = require('../models/dangkyonline')

class DangkyonlineController {
    store(req, res, next) {
        const dkonline = new dangkyon({
            name: req.body.name,
            email: req.body.email,
            phoneNum: req.body.phoneNum,
            numberOfTwoHoursTicket: req.body.numberOfTwoHoursTicket,
            numberOfUnlimitedTicket: req.body.numberOfUnlimitedTicket,
            status: true
        })
        dkonline.save().then(() => {
            res.redirect("/")
        })
    }

    store2(req, res, next) {
        console.log(req.body)

        sukien.findOne({ startDate: { $lte: Date.now() }, endDate: { $gte: Date.now() } })
            .then(sk => {
                for (let i = 0; i < sk.discountCode.length; i++) {
                    if (req.body.phoneNum === sk.discountCode[i]) {
                        return res.render('home', {
                            event: sk,
                            hasEvent: true,
                            error: true,
                            errorMessage: '1 số điện thoại không được đăng ký 2 lần cho cùng 1 sự kiện'
                        })
                    }
                }

                if (sk.currentNumofDiscountCode === sk.numberOfDiscountCode) {
                    res.redirect('/')
                } else {

                    const dkonline = new dangkyon({
                        name: req.body.name,
                        email: req.body.email,
                        phoneNum: req.body.phoneNum,
                        numberOfTwoHoursTicket: req.body.numberOfTwoHoursTicket,
                        numberOfUnlimitedTicket: req.body.numberOfUnlimitedTicket,
                        status: true
                    })

                    dkonline.save()
                        .then(result => {
                            const magiamgia = new dkonskdb({
                                code: req.body.phoneNum,
                                discount: sk.discount,
                                status: true,
                                quantity: Number(req.body.numberOfTwoHoursTicket) + Number(req.body.numberOfUnlimitedTicket)
                            })
                            magiamgia.save()
                                .then(result => {
                                    console.log(magiamgia)
                                    sk.discountCode.push(magiamgia.code)
                                    sk.currentNumofDiscountCode = sk.currentNumofDiscountCode + 1

                                    sk.save()
                                        .then(result => {
                                            res.redirect('/')
                                        })
                                })
                        })

                }
            })
            .catch(err => next(err))

        // var a = parseInt(req.body.numberOfTwoHoursTicket),
        //     b = parseInt(req.body.numberOfUnlimitedTicket),
        //     c = a + b
        // const magiamgia = new dkonskdb({
        //     code: req.body.phoneNum,
        //     discount: red.body.discount,
        //     quantity: c,
        //     status: true,
        //     endDate: req.body.endDate
        // })

        // sukien.find().lean()
        //     .then(events => {
        //         events = events.filter(e => {
        //             return (e.endDate > Date.now() && Date.now() > e.startDate)
        //         })
        //         var a = events[0].currentNumofDiscountCode
        //         sukien.findByIdAndUpdate(events[0]._id, { currentNumofDiscountCode: a + 1 }, (err, e) => {
        //             magiamgia.save()
        //                 .then(result => {
        //                     dkonline.save().then(() => {
        //                         res.redirect("/")
        //                     })
        //                 })
        //         })
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         next(err)
        //     })

    }

    index(req, res) {
        sukien.findOne({ startDate: { $lte: Date.now() }, endDate: { $gte: Date.now() } }).lean()
            .then(event => {
                if (!event) {
                    const event = {
                        imageUrl: './img/khu-vui-choi-ha-noi-nemtv-12.jpg',
                        name: 'Sự kiện đặc biệt',
                        eventInfo: 'Hiện tại chưa có sự kiện đặc biệt',
                        numberOfDiscountCode: 0,
                        currentNumofDiscountCode: 0
                    }
                    res.render('home', {
                        event: event,
                        hasEvent: false
                    })

                } else {
                    console.log(event)
                    res.render('home', {
                        event: event,
                        hasEvent: true
                    })
                }
            })
            .catch(err => next(err))

    }

}

module.exports = new DangkyonlineController