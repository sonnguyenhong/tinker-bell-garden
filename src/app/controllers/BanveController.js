const mongoose = require('mongoose')
const Ticket = require('../models/ve')
const VipCustomer = require('../models/khachhangvip')
const DiscountCode = require('../models/makhuyenmai')
const TicketOrder = require('../models/donhangve')
const VipHistory = require('../models/lichsucapnhat')
const OnlineOrder = require('../models/dangkyonline')

class BanveController {

    // Loai ve: bat dau bang 0 - ve choi 2 tieng
    // Loai ve: bat dau bang 1 - ve choi ca ngay dong gia

    // [GET] /admin/banve
    getSellTicketPage(req, res, next) {
        Ticket.find({}).lean()
            .then(tickets => {
                Ticket.countDocuments({ isPlaying: true }).lean()
                    .then(numberOfTicket => {
                        console.log(numberOfTicket)
                        res.render('banve/ban-ve', {
                            tickets: tickets,
                            quantity: numberOfTicket
                        })
                    })
            })
            .catch(err => next(err))
    }

    // [POST] /admin/banve/batdauchoi
    postStart(req, res, next) {
        const ticketCode = req.body.beginTicketCode
        Ticket.findOne({ code: ticketCode })
            .then(ticket => {
                if (!ticket) {
                    Ticket.find({}).lean()
                        .then(tickets => {
                            Ticket.countDocuments({ isPlaying: true }).lean()
                                .then(numberOfTickets => {
                                    res.render('banve/ban-ve', {
                                        tickets: tickets,
                                        error: true,
                                        errorMessage: 'Không tồn tại vé',
                                        quantity: numberOfTickets
                                    })
                                })
                        })
                } else if (ticket.isPlaying === true) {
                    Ticket.find({}).lean()
                        .then(tickets => {
                            Ticket.countDocuments({ isPlaying: true }).lean()
                                .then(numberOfTickets => {
                                    res.render('banve/ban-ve', {
                                        tickets: tickets,
                                        error: true,
                                        errorMessage: 'Vé đã bắt đầu chơi',
                                        quantity: numberOfTickets
                                    })
                                })
                        })
                } else {
                    console.log(Date.now())
                    Ticket.findByIdAndUpdate(ticket._id, {
                            isPlaying: true,
                            startTime: Date.now()
                        })
                        .lean()
                        .then(result => {
                            Ticket.find({}).lean()
                                .then(tickets => {
                                    Ticket.countDocuments({ isPlaying: true }).lean()
                                        .then(numberOfTickets => {
                                            res.render('banve/ban-ve', {
                                                tickets: tickets,
                                                message: 'Vào chơi thành công',
                                                quantity: numberOfTickets
                                            })
                                        })
                                })
                        })
                        .catch(err => next(err))
                }
            })
    }

    // [POST] /admin/banve/banvedattruoc
    postCheckOrderTicket(req, res, next) {
        const phoneNumber = req.body.phoneNumber
        OnlineOrder.findOne({ phoneNum: phoneNumber, status: true }).lean()
            .then(order => {
                console.log(order)
                if (!order) {
                    console.log('ok')
                    Ticket.find({}).lean()
                        .then(tickets => {
                            Ticket.countDocuments({ isPlaying: true }).lean()
                                .then(numberOfTickets => {
                                    res.render('banve/ban-ve', {
                                        tickets: tickets,
                                        quantity: numberOfTickets,
                                        error: true,
                                        errorMessage: 'Số điện thoại không đúng hoặc bạn chưa đặt vé thành công'
                                    })
                                })
                        })
                } else {
                    Ticket.find({}).lean()
                        .then(tickets => {
                            Ticket.countDocuments({ isPlaying: true }).lean()
                                .then(numberOfTickets => {
                                    OnlineOrder.findOneAndUpdate({ phoneNum: phoneNumber, status: true }, { status: false })
                                        .then(result => {
                                            res.render('banve/ban-ve', {
                                                tickets: tickets,
                                                quantity: numberOfTickets,
                                                isOrder: true,
                                                message: 'Bạn đã đặt vé. Thông tin chi tiết: ',
                                                orderInfo: order
                                            })
                                        })
                                })
                        })
                }
            })
            .catch(err => next(err))
    }

    // [POST] /admin/banve/ketthucchoi
    postEnd(req, res, next) {
        const ticketCode = req.body.endTicketCode
        Ticket.findOne({ code: ticketCode }).lean()
            .then(ticket => {
                if (!ticket) {
                    Ticket.find({}).lean()
                        .then(tickets => {
                            Ticket.countDocuments({ isPlaying: true }).lean()
                                .then(numberOfTickets => {
                                    res.render('banve/ban-ve', {
                                        tickets: tickets,
                                        error: true,
                                        errorMessage: 'Không tồn tại vé',
                                        quantity: numberOfTickets
                                    })
                                })
                        })
                } else if (ticket.isPlaying === false) {
                    Ticket.find({}).lean()
                        .then(tickets => {
                            Ticket.countDocuments({ isPlaying: true }).lean()
                                .then(numberOfTickets => {
                                    res.render('banve/ban-ve', {
                                        tickets: tickets,
                                        error: true,
                                        errorMessage: 'Vé chưa bắt đầu chơi',
                                        quantity: numberOfTickets
                                    })
                                })
                        })
                } else {
                    res.render('banve/thanh-toan', {
                        ticket: ticket,
                        endTime: Date.now()
                    })
                }
            })
            .catch(err => next(err))
    }

    // [POST] /admin/banve/kiemtravip
    // postCheckVip(req, res, next) {
    //     const ticketInfor = req.body
    //     console.log(ticketInfor)
    //     console.log(req.body.phoneNumber)
    //     VipCustomer.findOne({ phoneNumber: req.body.phoneNumber }).lean()
    //         .then(vipCustomer => {
    //             console.log(vipCustomer)
    //             if (!vipCustomer) {
    //                 console.log('Khong thay khach hang vip')
    //                 Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
    //                     .then(ticket => {
    //                         res.render('banve/thanh-toan', {
    //                             ticket: ticket,
    //                             endTime: req.body.endTime,
    //                             error: true,
    //                             errorMessage: 'Không tìm thấy khách hàng VIP'
    //                         })
    //                     })
    //             } else {
    //                 console.log('Tim thay may roi thang cho')
    //                 Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
    //                     .then(ticket => {
    //                         res.render('banve/thanh-toan', {
    //                             ticket: ticket,
    //                             endTime: req.body.endTime,
    //                             isVip: true,
    //                             message: 'Tìm thấy rồi',
    //                             vipInfo: vipCustomer
    //                         })
    //                     })
    //             }
    //         })
    //         .catch(err => next(err))
    // }

    // [POST] /admin/banve/kiemtra
    postCheckDiscountAndVip(req, res, next) {
        const ticketInfor = req.body
        console.log(ticketInfor)
        console.log(req.body.discountCode)

        DiscountCode.findOne({ code: req.body.discountCode }).lean()
            .then(discountCode => {
                console.log(discountCode)
                if (!discountCode) {
                    console.log('Không thấy mã giảm giá')
                    VipCustomer.findOne({ phoneNumber: req.body.phoneNumber }).lean()
                        .then(vipCustomer => {
                            if (!vipCustomer) {
                                Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
                                    .then(ticket => {
                                        res.render('banve/thanh-toan', {
                                            ticket: ticket,
                                            endTime: req.body.endTime,
                                            error: true,
                                            errorMessage: 'Không tồn tại mã giảm giá',
                                            isVipError: true,
                                            vipErrorMessage: 'Không tồn tại khách hàng VIP'
                                        })
                                    })
                            } else if (vipCustomer.expiryDate < Date.now()) {
                                Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
                                    .then(ticket => {
                                        res.render('banve/thanh-toan', {
                                            ticket: ticket,
                                            endTime: req.body.endTime,
                                            error: true,
                                            errorMessage: 'Không tồn tại mã giảm giá',
                                            isVip: true,
                                            isVipError: true,
                                            vipErrorMessage: 'Khách hàng VIP đã hết hạn'
                                        })
                                    })
                            } else {
                                Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
                                    .then(ticket => {
                                        res.render('banve/thanh-toan', {
                                            ticket: ticket,
                                            endTime: req.body.endTime,
                                            error: true,
                                            errorMessage: 'Không tồn tại mã giảm giá',
                                            isVip: true,
                                            vipInfo: vipCustomer
                                        })
                                    })
                            }
                        })
                } else if (discountCode.status === false || discountCode.quantity <= 0) {
                    console.log('Mã giảm giá không còn sử dụng được')
                    VipCustomer.findOne({ phoneNumber: req.body.phoneNumber }).lean()
                        .then(vipCustomer => {
                            if (!vipCustomer) {
                                Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
                                    .then(ticket => {
                                        res.render('banve/thanh-toan', {
                                            ticket: ticket,
                                            endTime: req.body.endTime,
                                            error: true,
                                            errorMessage: 'Mã giảm giá đã hết hạn',
                                            isVipError: true,
                                            vipErrorMessage: 'Không tồn tại khách hàng VIP'
                                        })
                                    })
                            } else if (vipCustomer.expiryDate < Date.now()) {
                                Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
                                    .then(ticket => {
                                        res.render('banve/thanh-toan', {
                                            ticket: ticket,
                                            endTime: req.body.endTime,
                                            error: true,
                                            errorMessage: 'Mã giảm giá đã hết hạn',
                                            isVip: true,
                                            isVipError: true,
                                            vipErrorMessage: 'Khách hàng VIP đã hết hạn'
                                        })
                                    })
                            } else {
                                Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
                                    .then(ticket => {
                                        res.render('banve/thanh-toan', {
                                            ticket: ticket,
                                            endTime: req.body.endTime,
                                            error: true,
                                            errorMessage: 'Mã giảm giá đã hết hạn',
                                            isVip: true,
                                            vipInfo: vipCustomer
                                        })
                                    })
                            }
                        })
                } else {
                    console.log('Đã tìm thấy mã rồi nhé :3')
                    VipCustomer.findOne({ phoneNumber: req.body.phoneNumber }).lean()
                        .then(vipCustomer => {
                            if (!vipCustomer) {
                                Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
                                    .then(ticket => {
                                        res.render('banve/thanh-toan', {
                                            ticket: ticket,
                                            endTime: req.body.endTime,
                                            hasDiscount: true,
                                            discountInfo: discountCode,
                                            isVipError: true,
                                            vipErrorMessage: 'Không tồn tại khách hàng VIP'
                                        })
                                    })
                            } else if (vipCustomer.expiryDate < Date.now()) {
                                Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
                                    .then(ticket => {
                                        res.render('banve/thanh-toan', {
                                            ticket: ticket,
                                            endTime: req.body.endTime,
                                            hasDiscount: true,
                                            discountInfo: discountCode,
                                            isVip: true,
                                            isVipError: true,
                                            vipErrorMessage: 'Khách hàng VIP đã hết hạn'
                                        })
                                    })
                            } else {
                                Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
                                    .then(ticket => {
                                        res.render('banve/thanh-toan', {
                                            ticket: ticket,
                                            endTime: req.body.endTime,
                                            hasDiscount: true,
                                            discountInfo: discountCode,
                                            isVip: true,
                                            vipInfo: vipCustomer
                                        })
                                    })
                            }
                        })
                }
            })
            .catch(err => next(err))
    }

    postMakePayment(req, res, next) {
        console.log(req.body)
            // req.body bao gom: discount, vipId, usePoints, ticketId, endTime
        let totalPrice = 0
        Ticket.findOne({ _id: mongoose.Types.ObjectId(req.body.ticketId) }).lean()
            .then(ticket => {
                let time = parseInt(req.body.endTime) - parseInt(Date.parse(ticket.startTime))
                if (ticket.type === 0) {
                    if (time <= 7200000) {
                        totalPrice = 50000 * time / 3600000
                    } else {
                        totalPrice = 50000 * 2 + 70000 * (time - 2 * 3600000) / 3600000
                    }
                } else {
                    totalPrice = 200000
                }
                totalPrice = totalPrice.toFixed(0)
                console.log(totalPrice)
                if (!req.body.vipId) {
                    if (!req.body.discount) {

                        const ticketOrder = new TicketOrder({
                            ticketType: ticket.type,
                            price: totalPrice
                        })
                        ticketOrder.save()
                            .then(result => {
                                const endTime = new Date(req.body.endTime)
                                Ticket.findByIdAndUpdate(ticket._id, {
                                        isPlaying: false,
                                        endTime: Date.now()
                                    })
                                    .then(result => {
                                        res.render('banve/thong-tin-don-hang', {
                                            ticket: ticket,
                                            totalPrice: totalPrice
                                        })
                                    })

                            })
                    } else {

                        const discount = parseInt(req.body.discount)
                        totalPrice = totalPrice - totalPrice * discount / 100
                        totalPrice = totalPrice.toFixed(0)
                        const ticketOrder = new TicketOrder({
                            ticketType: ticket.type,
                            price: totalPrice,
                            discountCode: req.body.discountCode
                        })

                        ticketOrder.save()
                            .then(result => {
                                const endTime = new Date(req.body.endTime)
                                Ticket.findByIdAndUpdate(ticket._id, {
                                        isPlaying: false,
                                        endTime: Date.now()
                                    })
                                    .then(result => {
                                        res.render('banve/thong-tin-don-hang', {
                                            ticket: ticket,
                                            totalPrice: totalPrice,
                                            hasDiscount: true,
                                            discountCode: req.body.discountCode,
                                            discount: req.body.discount
                                        })
                                    })
                            })
                    }
                } else {
                    VipCustomer.findOne({ _id: mongoose.Types.ObjectId(req.body.vipId) }).lean()
                        .then(vipCustomer => {
                            if (vipCustomer.points < req.body.usePoints) {
                                res.render('banve/thanh-toan', {
                                    ticket: ticket,
                                    endTime: req.body.endTime,
                                    isVip: true,
                                    vipInfo: vipCustomer,
                                    hasDiscount: req.body.hasDiscount,
                                    discountInfo: {
                                        discount: parseInt(req.body.discount)
                                    },
                                    isVipError: true,
                                    vipErrorMessage: 'Không đủ điểm tích lũy'
                                })
                            } else {
                                if (!req.body.discount) {
                                    totalPrice = totalPrice - parseInt(req.body.usePoints) * 1000
                                    const ticketOrder = new TicketOrder({
                                        ticketType: ticket.type,
                                        price: totalPrice,
                                        phoneNum: vipCustomer.phoneNumber
                                    })

                                    ticketOrder.save()
                                        .then(result => {
                                            var today = new Date();
                                            var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                                            const ls = new VipHistory({
                                                updateAt: date,
                                                oldName: vipCustomer.name,
                                                newName: vipCustomer.name,
                                                oldAddress: vipCustomer.address,
                                                newAddress: vipCustomer.address,
                                                oldPoints: vipCustomer.points,
                                                newPoints: vipCustomer.points - parseInt(req.body.usePoints),
                                                oldExpiryDate: vipCustomer.expiryDate,
                                                newExpiryDate: vipCustomer.expiriDate,
                                                describe: "Mua vé sử dụng " + req.body.usePoints + " điểm.",
                                                khachhang: vipCustomer._id
                                            })

                                            VipCustomer.findByIdAndUpdate(vipCustomer._id, { points: ls.newPoints })
                                                .then(result => {
                                                    ls.save()
                                                        .then(result => {
                                                            Ticket.findByIdAndUpdate(ticket._id, {
                                                                    isPlaying: false,
                                                                    endTime: Date.now()
                                                                })
                                                                .then(result => {
                                                                    res.render('banve/thong-tin-don-hang', {
                                                                        ticket: ticket,
                                                                        totalPrice: totalPrice,
                                                                        isVip: true,
                                                                        vipInfo: vipCustomer,
                                                                        usePoints: req.body.usePoints
                                                                    })
                                                                })
                                                        })
                                                })
                                        })
                                } else {
                                    const discount = parseInt(req.body.discount)
                                    totalPrice = totalPrice - parseInt(req.body.usePoints) * 1000
                                    totalPrice = totalPrice - totalPrice * discount / 100

                                    const ticketOrder = new TicketOrder({
                                        ticketType: ticket.type,
                                        price: totalPrice,
                                        phoneNum: vipCustomer.phoneNumber,
                                        discountCode: req.body.discountCode
                                    })

                                    ticketOrder.save()
                                        .then(result => {
                                            var today = new Date();
                                            var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                                            const ls = new VipHistory({
                                                updateAt: date,
                                                oldName: vipCustomer.name,
                                                newName: vipCustomer.name,
                                                oldAddress: vipCustomer.address,
                                                newAddress: vipCustomer.address,
                                                oldPoints: vipCustomer.points,
                                                newPoints: vipCustomer.points - parseInt(req.body.usePoints),
                                                oldExpiryDate: vipCustomer.expiryDate,
                                                newExpiryDate: vipCustomer.expiriDate,
                                                describe: "Mua vé sử dụng " + req.body.usePoints + " điểm.",
                                                khachhang: vipCustomer._id
                                            })

                                            VipCustomer.findByIdAndUpdate(vipCustomer._id, { points: ls.newPoints })
                                                .then(result => {
                                                    ls.save()
                                                        .then(result => {
                                                            Ticket.findByIdAndUpdate(ticket._id, {
                                                                    isPlaying: false,
                                                                    endTime: Date.now()
                                                                })
                                                                .then(result => {
                                                                    res.render('banve/thong-tin-don-hang', {
                                                                        ticket: ticket,
                                                                        totalPrice: totalPrice,
                                                                        isVip: true,
                                                                        vipInfo: vipCustomer,
                                                                        usePoints: req.body.usePoints,
                                                                        hasDiscount: true,
                                                                        discountCode: req.body.discountCode,
                                                                        discount: req.body.discount
                                                                    })
                                                                })
                                                        })
                                                })
                                        })
                                }
                            }
                        })
                }

            })
            .catch(err => next(err))
    }

    // getAddTicket(req, res, next) {
    //     res.render('banve/them-ve')
    // }

    // postAddTicket(req, res, next) {
    //     for (let i = 0; i < 500; i++) {
    //         let code = new String(i)
    //         while (code.length < 7) {
    //             if (code.length === 6) {
    //                 code = "1" + code
    //             } else {
    //                 code = "0" + code
    //             }
    //         }
    //         const ticket = new Ticket({
    //             code: code,
    //             type: 1
    //         })

    //         ticket.save()
    //             .then(result => {
    //                 console.log('Them thanh cong')
    //             })
    //             .catch(err => next(err))
    //     }
    // }

}

module.exports = new BanveController