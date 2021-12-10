const LoginRouter = require('./login');
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
function route(app){
    // auth
    app.use(function(req,res,next){
        try{
            console.log(req.path)
            if(req.path == '/' || req.path == '/login') return next();
            const token = req.cookies.token;
            const isValid = jwt.verify(token, 'mk');
            if(isValid){
              return next();
            }
            else return res.redirect('/login');
          }
          catch{
            return res.redirect('/login');
          }
    })

    app.use('/login',LoginRouter)
}

module.exports = route;