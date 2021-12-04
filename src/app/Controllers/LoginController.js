const account = require('../models/account')
const jwt = require('jsonwebtoken')
const jwtHelper = require('../helper/jwtHelper')
const bcrypt = require('bcrypt');
// username: tinkerbellgarden 
// password: tinkerbellgarden
class LoginController{
    
    //[POST] Login
    login(req, res){
       // res.json(req.body);
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
                const isValidPassword = bcrypt.compareSync(password, data.password);
                if(isValidPassword){
                    var token = jwtHelper.generateToken(data,'mk','2h');
                    // res.json({
                    //     'token' : token
                    // });
                    //res.cookie('token',token); 
                   // res.json(cookie);
                   res.cookie('token', token);
                   res.redirect('/');
                }else{
                    console.log('sai mk');
                }
            }
                else console.log("sai thong tin")
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