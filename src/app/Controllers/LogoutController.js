const account = require('../models/account')
const jwt = require('jsonwebtoken')
const jwtHelper = require('../helper/jwtHelper')
const bcrypt = require('bcrypt');

class LogoutController{
    // [GET] /logout
    logout(req,res){
        res.clearCookie('token');
        return res.redirect('/login')
    }
}

module.exports = new LogoutController;