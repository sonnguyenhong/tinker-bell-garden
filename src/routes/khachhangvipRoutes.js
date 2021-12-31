const express = require('express');
const vipController = require('../app/controllers/vipController');
const router = express.Router();

router.post('/store', vipController.store)
router.get('/history', vipController.showAllHistories)
router.get('/create', vipController.create)
router.post('/:id/update', vipController.update)
router.post('/:id/delete', vipController.terminate)
router.get('/:id/history', vipController.showHistory)
router.get('/:id', vipController.vipInfo)
router.get('/', vipController.index)

module.exports = router