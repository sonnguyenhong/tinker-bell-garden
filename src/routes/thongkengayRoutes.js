const express = require('express');
const thongkengayController = require('../app/controllers/thongkengayController');
const router = express.Router();

router.get('/', thongkengayController.showTicketStats)
router.post('/getInfo', thongkengayController.getTicketStats)

module.exports = router