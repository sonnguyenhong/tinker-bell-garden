const Product = require('../models/mathang')
const VipCustomer = require('../models/khachhangvip')
const Order = require('../models/donhang')
const VipHistory = require('../models/lichsucapnhat')

const mongoose = require('mongoose')
const fileHelper = require('../../util/file')
const path = require('path')
const { response } = require('express')

class BanhangController {

    // [GET] /admin/banhang

    getHomePage(req, res, next) {
        Product.find({}).lean()
            .then(products => {
                // console.log(products)
                res.render('banhang/trangchu', {
                    products: products
                })
            })
            .catch(err => next(err))
    }

    // [GET] /admin/banhang/quanlymathang
    getProductList(req, res, next) {
        Product.find({}).lean()
            .then(products => {
                // console.log(products)
                res.render('banhang/danh-sach-mat-hang', {
                    products: products
                })
            })
            .catch(err => next(err))
    }

    // [GET] /admin/banhang/quanlymathang/:id
    getProductDetail(req, res, next) {
        Product.findOne({ _id: req.params.id }).lean()
            .then(product => {
                // console.log(product)
                res.render('banhang/chi-tiet-mat-hang', {
                    product: product
                })
            })
            .catch(err => next(err))
    }

    // [GET] /admin/banhang/quanlymathang/:id/sua
    getUpdateProduct(req, res, next) {
        Product.findOne({ _id: req.params.id }).lean()
            .then(product => {
                if (!product) {
                    res.redirect('/')
                } else {
                    // console.log(product)
                    res.render('banhang/sua-mat-hang', {
                        product: product
                    })
                }
            })
            .catch(err => next(err))
    }

    // [POST] /admin/banhang/quanlymathang/:id/sua
    postUpdateProduct(req, res, next) {
        const productId = req.body.productId
        const updatedName = req.body.name
        const updatedPrice = req.body.price
        const updatedQuantity = req.body.quantity
        let image = null
        var url = path.resolve(__dirname)
        url = url.replace('\\app\\controllers', '\\public\\img')
        console.log(image)

        if (req.files != null) image = req.files.image
        if (image) {
            image.mv(path.resolve(url, image.name), (err) => {
                Product.findByIdAndUpdate(req.params.id, {
                        name: updatedName,
                        price: updatedPrice,
                        quantity: updatedQuantity,
                        imageUrl: '/img/' + image.name
                    })
                    .then(result => {
                        res.redirect('/admin/banhang/quanlymathang')
                    })
                    .catch(err => next(err))
            })
        } else {
            Product.findByIdAndUpdate(req.params.id, {
                    name: updatedName,
                    price: updatedPrice,
                    quantity: updatedQuantity
                })
                .then(result => {
                    res.redirect('/admin/banhang/quanlymathang')
                })
                .catch(err => next(err))
        }
    }

    // [POST] /admin/banhang/quanlymathang/:id/xoa
    postDeleteProduct(req, res, next) {
        const productId = req.params.id
        Product.findByIdAndDelete(productId)
            .then(result => {
                res.redirect('/admin/banhang/quanlymathang')
            })
            .catch(err => next(err))
    }

    // [GET] /admin/banhang/themmathang
    getAddProductForm(req, res, next) {
        res.render('banhang/them-mat-hang')
    }


    // [POST] /admin/banhang/themmathang 
    postAddProduct(req, res, next) {
        const name = req.body.name
        const price = req.body.price
        const quantity = req.body.quantity
        let image = req.files.image

        if (!image) {
            console.log('Khong co anh')
            return
        }

        var url = path.resolve(__dirname)
        url = url.replace('\\app\\controllers', '\\public\\img')
        image.mv(path.resolve(url, image.name), (err) => {
            Product.create({
                    name: name,
                    price: price,
                    quantity: quantity,
                    imageUrl: '/img/' + image.name
                })
                .then(result => {
                    res.redirect('/admin/banhang/quanlymathang')
                })
                .catch(err => next(err))
        })
    }

    // [GET] /admin/banhang/giohang
    getCart(req, res, next) {
        const orderInfo = req.body
        console.log(orderInfo)
            // console.log(orderInfo)
            // check vip customer

        const productIds = []
        for (var key in orderInfo) {
            if (key !== 'phoneNumber') {
                // console.log(key)
                productIds.push(mongoose.Types.ObjectId(key))
            }
        }

        Product.find({ "_id": { "$in": productIds } }).lean()
            .then(products => {
                console.log(products)
                res.render('banhang/giohang', {
                    products: products,
                    orderInfo: orderInfo
                })
            })
    }

    // [POST] /admin/banhang/kiemtravip
    postCheckVip(req, res, next) {
        const orderInfo = req.body // Bao gom phoneNumber, danh sach product va quantity
            // console.log(orderInfo)
            // console.log(orderInfo)
            // check vip customer
        console.log(orderInfo)
        const phoneNumber = req.body.phoneNumber
        console.log(phoneNumber)
        const productIds = []
        for (var key in req.body) {
            if (key !== 'phoneNumber') {
                // console.log(key)
                productIds.push(mongoose.Types.ObjectId(key))
            }
        }

        Product.find({ "_id": { "$in": productIds } }).lean()
            .then(products => {
                if (phoneNumber === '') {
                    console.log('Khong co SDT')
                    res.render('banhang/giohang', {
                        products: products,
                        orderInfo: orderInfo,
                        isVip: false,
                        error: true,
                        message: 'Bạn chưa nhập số điện thoại. Hãy nhập SĐT trước khi kiểm tra.'
                    })
                } else {
                    VipCustomer.findOne({ phoneNumber: phoneNumber }).lean()
                        .then(vipCustomer => {
                            if (!vipCustomer) {
                                console.log('Khong thay khach hang')
                                res.render('banhang/giohang', {
                                    products: products,
                                    orderInfo: orderInfo,
                                    isVip: false,
                                    error: true,
                                    message: 'Số điện thoại không đúng hoặc khách hàng chưa đăng ký thành viên VIP'
                                })
                            } else {
                                console.log('Dmm thay roi')
                                res.render('banhang/giohang', {
                                    products: products,
                                    orderInfo: orderInfo,
                                    isVip: true,
                                    vipInfo: vipCustomer,
                                })
                            }
                        })
                }
            })
            .catch(err => next(err))
    }


    // [POST] /admin/banhang/taodonhang
    postCreateOrder(req, res, next) {
        console.log(req.body)

        const productOrderList = []
        const productOrderQuantity = []
        for (var key in req.body) {
            if (key !== 'vipId' && key !== 'usePoints') {
                productOrderList.push(mongoose.Types.ObjectId(key))
                productOrderQuantity.push(req.body[key])
            }
        }
        // console.log(productOrderList)
        // console.log(productOrderQuantity)

        const products = []
        for (let i = 0; i < productOrderList.length; i++) {
            products.push({
                productId: productOrderList[i],
                quantity: parseInt(productOrderQuantity[i])
            })
        }

        // console.log(products)
        // console.log(products.productId)

        // for (let i = 0; i < productOrderList.length; i++) {
        //     // console.log(productOrderList[i])
        //         // let prodId = productOrderList[i].toString()
        //     // console.log(req.body[productOrderList[i].toString()])
        // }

        let hasDiscount = true
        if (req.body.vipId === undefined) {
            hasDiscount = false
        }
        console.log(req.body.vipId)
        console.log("hasDiscount: " + hasDiscount)
        let totalPrice = 0

        Product.find({ "_id": { "$in": productOrderList } }).lean()
            .then(prods => {
                // console.log(prods)
                for (let i = 0; i < prods.length; i++) {
                    totalPrice += prods[i].price * req.body[prods[i]._id.toString()]
                }
                console.log(totalPrice)

                if (hasDiscount) {
                    VipCustomer.findById(mongoose.Types.ObjectId(req.body.vipId)).lean()
                        .then(vipCustomer => {
                            const phoneNumber = vipCustomer.phoneNumber
                            let orderInfo = {
                                phoneNumber: phoneNumber
                            }
                            for (let i = 0; i < productOrderList.length; i++) {
                                orderInfo[productOrderList[i]] = productOrderQuantity[i]
                            }

                            console.log(orderInfo)

                            console.log(vipCustomer.name)
                            if (vipCustomer.points < req.body.usePoints) {
                                res.render('banhang/giohang', {
                                    products: prods,
                                    orderInfo: orderInfo,
                                    isVip: true,
                                    isVipError: true,
                                    vipInfo: vipCustomer,
                                    vipErrorMessage: 'Bạn không đủ điểm.'
                                })
                            } else {
                                totalPrice = totalPrice - parseInt(req.body.usePoints) * 1000
                                const order = new Order({
                                    products: products,
                                    price: totalPrice,
                                    hasDiscount: hasDiscount
                                })

                                order.save()
                                    .then(result => {
                                        console.log(products)

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
                                            describe: "Mua hàng sử dụng " + req.body.usePoints + " điểm.",
                                            khachhang: vipCustomer._id
                                        })

                                        VipCustomer.findByIdAndUpdate(vipCustomer._id, { points: ls.newPoints })
                                            .then(result => {
                                                ls.save()
                                                    .then(result => {
                                                        res.render('banhang/thong-tin-don-hang', {
                                                            products: prods,
                                                            orderInfo: orderInfo,
                                                            totalPrice: totalPrice,
                                                            discount: parseInt(req.body.usePoints) * 1000
                                                        })
                                                    })
                                            })

                                    })
                            }
                        })
                } else {
                    const order = new Order({
                        products: products,
                        price: totalPrice,
                        hasDiscount: hasDiscount
                    })

                    order.save()
                        .then(result => {
                            let orderInfo = {}
                            for (let i = 0; i < productOrderList.length; i++) {
                                orderInfo[productOrderList[i]] = productOrderQuantity[i]
                            }

                            res.render('banhang/thong-tin-don-hang', {
                                products: prods,
                                orderInfo: orderInfo,
                                totalPrice: totalPrice,
                                discount: 0
                            })
                        })
                }
            })
            .catch(err => next(err))

    }
}

module.exports = new BanhangController