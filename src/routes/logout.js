const express = require('express');
const router = express.Router();
const logoutController = require('../app/Controllers/LogoutController');

router.get('/',logoutController.logout)

module.exports = router;