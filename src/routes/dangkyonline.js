const express = require('express')
const router = express.Router()
const dangkyonlineController = require('../app/controllers/dangkyonlineController')

router.post('/dangkyonline', dangkyonlineController.store)
router.get('/',dangkyonlineController.index)
router.post('/dangkiskdb', dangkyonlineController.store2)

module.exports = router