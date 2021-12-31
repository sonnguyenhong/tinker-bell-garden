const express = require('express')
const router = express.Router()

const banhangController = require('../app/controllers/BanhangController')

router.get('/', banhangController.getHomePage)
router.get('/quanlymathang', banhangController.getProductList)
router.get('/quanlymathang/:id', banhangController.getProductDetail)
router.get('/quanlymathang/:id/sua', banhangController.getUpdateProduct)
router.post('/quanlymathang/:id/sua', banhangController.postUpdateProduct)
router.post('/quanlymathang/:id/xoa', banhangController.postDeleteProduct)
router.get('/themmathang', banhangController.getAddProductForm)
router.post('/themmathang', banhangController.postAddProduct)
router.post('/giohang', banhangController.getCart)
router.post('/kiemtravip', banhangController.postCheckVip)
router.post('/taodonhang', banhangController.postCreateOrder)

module.exports = router