const express = require('express');
const thongkeController = require('../app/controllers/thongkeController');
const router = express.Router();

router.get('/thongkengay', thongkeController.showDayStats)
router.post('/thongkengay/getInfo', thongkeController.getDayStats)
router.get('/thongkethang', thongkeController.showMonthStats)
router.post('/thongkethang/getInfo', thongkeController.getMonthStats)
module.exports = router