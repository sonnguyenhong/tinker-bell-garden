const express = require('express');
const vipController = require('../app/controllers/vipController');
const router = express.Router();

router.post('/store', vipController.store)
router.get('/history', vipController.showHistory)
router.get('/create', vipController.create)
router.get('/', vipController.index)

module.exports = router