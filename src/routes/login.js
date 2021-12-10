const express = require('express');
const router = express.Router();
const loginController = require('../app/Controllers/LoginController');

router.get('/',loginController.show)
router.post('/',loginController.login)

module.exports = router;