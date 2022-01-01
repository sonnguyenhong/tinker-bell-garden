const transform = require('../../util/mongoose')
const mongoose = require('mongoose')
const Khachhangvip = require('../models/khachhangvip.js')
const lichSu = require('../models/lichsucapnhat.js')

class vipController {
    index(req, res, next) {
        Khachhangvip.find({})
            .then(vips => {
                res.render('ql-khachhang-vip/quanly-kh-vip', {
                    vips: transform.mutipleMongooseToObject(vips),
                });
            })
            .catch(next);
    }

    showAllHistories(req, res, next) {
        lichSu.find({}).populate('khachhang')
            .then(histories => {
                res.render('ql-khachhang-vip/lichsu-kh-vip', {
                    histories: transform.mutipleMongooseToObject(histories),
                });
            })
            .catch(next);
    }

    showHistory(req, res, next) {
        lichSu.find({ khachhang: req.params.id }).populate('khachhang')
            .then(histories => {
                res.render('ql-khachhang-vip/lichsu-kh-vip', {
                    histories: transform.mutipleMongooseToObject(histories),
                });
            })
            .catch(next);
    }

    create(req, res) {
        res.render('ql-khachhang-vip/them-kh-vip')
    }

    store(req, res, next) {
        var d = new Date();

        d.setFullYear(d.getFullYear() + 1);
        const khvip = new Khachhangvip({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            points: 0,
            expiryDate: d
        })
        khvip.save()
            .then(() => {
                var today = new Date();
                var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                const ls = new lichSu({
                    updateAt: date,
                    newName: req.body.name,
                    newAddress: req.body.address,
                    newPoints: 0,
                    newExpiryDate: d,
                    describe: "Khách hàng VIP mới",
                    khachhang: khvip._id
                })
                ls.save();
                res.render('ql-khachhang-vip/them-kh-vip', {
                    success: true,
                })
            })
            .catch(next => {
                res.render('ql-khachhang-vip/them-kh-vip', {
                    err: true,
                })
            })
            /*
            var today = new Date();
            var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
            const ls=new lichSu({
                updateAt: date,
                newName: req.body.name,
                newAddress: req.body.address,
                newPoints: 0,
                newExpiryDate: d,
                describe: "Khách hàng VIP mới",
                khachhang: khvip._id
            })
            ls.save()
                .then(()=> res.redirect('/admin/vip'))
            */
    }

    vipInfo(req, res) {
        Khachhangvip.findOne({ _id: req.params.id }).lean()
            .then(khvip => {
                res.render('ql-khachhang-vip/chitiet-kh-vip', {
                    khvip: khvip,
                    remainTime: ((khvip.expiryDate.getTime() - Date.now()) / 86400000).toFixed()
                })
            })
    }

    update(req, res, next) {
        Khachhangvip.findOne({ _id: req.params.id })
            .then(khvip => {
                var today = new Date();
                var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
                const ls = new lichSu({
                    updateAt: date,
                    oldName: khvip.name,
                    newName: req.body.name,
                    oldAddress: khvip.address,
                    newAddress: req.body.address,
                    oldPoints: khvip.points,
                    newPoints: req.body.points,
                    oldExpiryDate: khvip.expiryDate,
                    newExpiryDate: Date.now() + req.body.remainTime * 86400000,
                    describe: "",
                    khachhang: khvip._id
                })

                if (ls.newName !== ls.oldName) ls.describe = ls.describe + " Tên mới: " + ls.newName + ". "
                if (ls.newAddress !== ls.oldAddress) ls.describe = ls.describe + " Địa chỉ mới: " + ls.newAddress + ". "
                if (ls.newPoints !== ls.oldPoints) ls.describe = ls.describe + " Số điểm mới: " + ls.newPoints + ". "
                if (ls.oldExpiryDate !== ls.newExpiryDate) ls.describe = ls.describe + "Gia hạn thêm thời gian. Ngày hết hạn: " + ls.newExpiryDate

                ls.save();

                khvip.name = req.body.name;
                khvip.address = req.body.address;
                khvip.points = req.body.points;
                khvip.expiryDate = Date.now() + req.body.remainTime * 86400000;

                khvip.save()
                    .then(() => {
                        res.redirect('/admin/vip/' + khvip._id)
                    })
            })
    }

    terminate(req, res, next) {
        Khachhangvip.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/admin/vip'))
            .catch(next);
    }
}

module.exports = new vipController();