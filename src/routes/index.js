const LoginRouter = require('./login');
const LogoutRouter = require('./logout');
const ChangePasswordRouter = require('./changePassword')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
function route(app){
    // auth
    app.use(function(req,res,next){
        try{
            //console.log(req.path)
            if(req.path == '/' || req.path == '/login' || req.path == '/logout') return next();
            const token = req.cookies.token;
            const isValid = jwt.verify(token, 'mk');
            if(isValid){
              return next();
            }
            else{
              return res.redirect('/login');
            }    
          }
          catch{
            return res.redirect('/login');
          }
    })

    app.use('/login',LoginRouter)
    app.use('/logout',LogoutRouter)
    app.use('/changepassword',ChangePasswordRouter)
    app.use('/test', function(req,res){
      res.json('logined')
    })
}

module.exports = route;