const Product = require('../models/mathang')
const VipCustomer = require('../models/khachhangvip')

const mongoose = require('mongoose')
const fileHelper = require('../../util/file')
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
        const image = req.file
        console.log(image)

        Product.findById(productId)
            .then(product => {
                product.name = updatedName
                product.price = updatedPrice
                product.quantity = updatedQuantity
                if (image) {
                    fileHelper.deleteFile(product.imageUrl)
                    product.imageUrl = image.path
                }

                return product.save()
                    .then(result => {
                        res.redirect('/admin/banhang/quanlymathang')
                    })
            })
            .catch(err => next(err))
    }

    // [POST] /admin/banhang/quanlymathang/:id/xoa
    postDeleteProduct(req, res, next) {
        const productId = req.params.id
        Product.findById(productId)
            .then(product => {
                if (!product) {
                    console.log('KHONG TON TAI MAT HANG')
                    return
                }
                fileHelper.deleteFile(product.imageUrl)
                return Mathang.deleteOne({ _id: productId })
            })
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
        const image = req.file

        if (!image) {
            console.log('Khong co anh')
            return
        }

        const imageUrl = image.path

        const product = new Product({
            name: name,
            price: price,
            quantity: quantity,
            imageUrl: imageUrl
        })

        product.save()
            .then(result => {
                res.redirect('/admin/banhang/quanlymathang')
            })
            .catch(err => next(err))
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
        const orderInfo = req.body
            // console.log(orderInfo)
            // console.log(orderInfo)
            // check vip customer

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
    }
}

module.exports = new BanhangController