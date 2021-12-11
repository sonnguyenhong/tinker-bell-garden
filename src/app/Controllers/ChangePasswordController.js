const account = require('../models/account')
const jwt = require('jsonwebtoken')
const jwtHelper = require('../helper/jwtHelper')
const bcrypt = require('bcrypt');
const jwtDecode = require('jwt-decode')
class ChangePasswordController{
    // [GET] /changepassword
    show(req,res){
        res.render('change-password')
    }
    //[POST] /changepassword
    change(req,res){
        //console.log(req.body)
        console.log(req.cookies.token)
        const token = req.cookies.token;
        console.log(req.body.currentPassword)
        account.findOne({changePasswordToken: token})
        .then(data=>{
            //return res.json(data)
            const isValidPassword = bcrypt.compareSync(req.body.currentPassword, data.password);
            if(isValidPassword){
                data.password = req.body.nextPassword;
                data.save();
                return res.render('/');
            }
            else return res.redirect('/changepassword');
        })
        .catch(err=>{
            res.redirect('/changepassword')
        })
    }
}

module.exports = new ChangePasswordController;