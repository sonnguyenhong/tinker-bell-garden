const express = require('express');
const router = express.Router();
const changePassword = require('../app/Controllers/ChangePasswordController');

router.get('/',changePassword.show)
router.post('/',changePassword.change)

module.exports = router;