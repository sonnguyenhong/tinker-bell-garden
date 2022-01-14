const account = require('../models/account');
const jwtHelper = require('../helper/jwtHelper')
const jwt = require('jsonwebtoken')
module.exports.requireAuth = function(req,res,next){
    try{
        //console.log(req.path)
        if(req.path == '/' || req.path == '/login' || req.path == '/logout' || req.path) return next();
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
}