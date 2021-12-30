const transform = require('../../util/mongoose')
const Khachhangvip = require('../models/khachhangvip.js')
const lichSu = require('../models/lichsucapnhat.js')

class vipController {
    index(req, res, next){
        Khachhangvip.find({})
            .then(vips => {
                res.render('ql-khachhang-vip/quanly-kh-vip', { 
                    vips: transform.mutipleMongooseToObject(vips),
                });
            })
            .catch(next);
    }

    showHistory(req, res, next){
        lichSu.find({}).populate('khachhang')
            .then(histories => {
                res.render('ql-khachhang-vip/lichsu-kh-vip', { 
                    histories: transform.mutipleMongooseToObject(histories),
                });
            })
            .catch(next);
    }

    create(req, res){
        res.render('ql-khachhang-vip/them-kh-vip')
    }

    store(req, res, next){
        var d=new Date();
        
        d.setFullYear(d.getFullYear()+1);
        const khvip=new Khachhangvip({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            email: req.body.email,
            points: 0,
            expiryDate: d
        })
        khvip.save()
        
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
            .catch(next)
    }
}

module.exports = new vipController();