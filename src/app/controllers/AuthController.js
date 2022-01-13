const account = require('../models/account')
const jwt = require('jsonwebtoken')
const jwtHelper = require('../helper/jwtHelper')
const bcrypt = require('bcrypt');
// username: tinkerbellgarden 
// password: tinkerbellgarden
class AuthController {
    //[POST] Login
    login(req, res) {
        // var form = req.body
        //console.log(req.body)
        // form.name = 'admin1'
        // form.refreshToken = 'refreshToken'
        // var acc = new account(form);
        // acc.save();
        // return res.json(req.body);
        if (req.body === {}) return res.status(500).json('not found infomation');
        if (req.body.username === undefined) return res.status(500).json('not found username');
        if (req.body.password === undefined) return res.status(500).json('not found password');

        const username = req.body.username;
        const password = req.body.password;
        account.findOne({
                username: username,
            })
            .then(data => {
                if (data) {
                    // data.password = 'tinkerbellgarden'
                    // data.save();
                    // return res.json('changed')
                    //console.log("data:" + data)
                    const isValidPassword = bcrypt.compareSync(password, data.password);
                    if (isValidPassword) {
                        var token = jwtHelper.generateToken(data.name, 'mk', '1d');
                        // var refreshToken = jwtHelper.generateToken(data.name,'refreshSecret','1d');
                        // if(data.refreshToken == 'refreshToken')
                        // account.updateRefreshToken(data.username,refreshToken);
                        // else refreshToken = data.refreshToken;
                        // res.json({
                        //     'token' : token
                        // });
                        //res.cookie('token',token); 
                        // res.json(cookie);
                        data.changePasswordToken = token;
                        data.save();
                        res.cookie('token', token);
                        return res.redirect('/admin');
                    } else {
                        return res.redirect('/login')
                    }
                } else {
                    return res.redirect('/login')
                }
            })
            .catch(err => {
                next(err)
            })


    }

    //[GET] login
    showLogin(req, res, next) {

        res.render('auth/login')

    }

    //log out
    // [GET] /logout
    logout(req, res) {
        res.clearCookie('token');
        return res.redirect('/login')
    }

    //changepassword
    // [GET] /changepassword
    showChangePassword(req, res) {
            res.render('auth/changePassword')
        }
        //[POST] /changepassword
    change(req, res) {
        //console.log(req.body)
        console.log(req.cookies.token)
        const token = req.cookies.token;
        console.log(req.body.currentPassword)
        account.findOne({ changePasswordToken: token })
            .then(data => {
                //return res.json(data)
                const isValidPassword = bcrypt.compareSync(req.body.currentPassword, data.password);
                if (isValidPassword) {
                    data.password = req.body.nextPassword;
                    data.save();
                    return res.redirect('/admin');
                } else return res.render('auth/changePassword', { success: "false" });
            })
            .catch(err => {
                return res.render('auth/changePassword', { success: "false" });
            })
    }

}




module.exports = new AuthController;