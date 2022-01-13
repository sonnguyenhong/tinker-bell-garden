const express = require('express')
const router = express.Router()

const banveController = require('../app/controllers/BanveController')

router.get('/', banveController.getSellTicketPage)
router.post('/batdauchoi', banveController.postStart)
router.post('/ketthucchoi', banveController.postEnd)
router.post('/kiemtra', banveController.postCheckDiscountAndVip)
router.post('/taodonve', banveController.postMakePayment)
router.post('/banvedattruoc', banveController.postCheckOrderTicket)
    // router.post('/kiemtramagiamgia', banveController.postCheckDiscountCode)
    // router.get('/themve', banveController.getAddTicket)
    // router.post('/themve', banveController.postAddTicket)

module.exports = router