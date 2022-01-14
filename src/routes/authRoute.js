const express = require('express');
const router = express.Router();
const AuthController = require('../app/Controllers/AuthController');

router.get('/login',AuthController.showLogin)
router.post('/login',AuthController.login)
router.get('/admin/login',AuthController.logout)
router.get('/admin/changepassword',AuthController.showChangePassword)
router.post('/admin/changepassword',AuthController.change)
router.get('/logout', AuthController.logout)
module.exports = router;