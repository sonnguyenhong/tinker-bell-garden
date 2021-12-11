const account = require('../models/account')
const jwt = require('jsonwebtoken')
const jwtHelper = require('../helper/jwtHelper')
const bcrypt = require('bcrypt');
// username: tinkerbellgarden 
// password: tinkerbellgarden
class LoginController{
    //[POST] Login
    login(req, res){
        // var form = req.body
         console.log(req.body)
        // form.name = 'admin1'
        // form.refreshToken = 'refreshToken'
        // var acc = new account(form);
        // acc.save();
        // return res.json(req.body);
        if(req.body === {}) return res.status(500).json('not found infomation');
        if(req.body.username === undefined) return res.status(500).json('not found username');
        if(req.body.password === undefined) return res.status(500).json('not found password');
        
        const username = req.body.username;
        const password = req.body.password;
        account.findOne({
            username : username,
        })
        .then(data=>{
            if(data) {
                //console.log("data:" + data)
                const isValidPassword = bcrypt.compareSync(password, data.password);
                if(isValidPassword){
                    var token = jwtHelper.generateToken(data.name,'mk','1d');
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
                   return res.redirect('/');
                }else{
                    return res.redirect('/login')
                }
            }
                else{
                    return res.redirect('/login')
                }
        })
        .catch(err=>{
            console.log(err.message);
        })


    }

    //[GET] login
    show(req,res, next){
    
        res.render('login')
    
    }

}




module.exports = new LoginController;