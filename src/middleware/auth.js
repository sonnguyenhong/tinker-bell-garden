const account = require('../app/models/account');
const jwtHelper = require('../app/helper/jwtHelper')
const jwt = require('jsonwebtoken')
module.exports.requireAuth = function(req,res,next){
    try{
      const token = req.cookies.token;
      const isValid = jwt.verify(token, 'mk');
      if(isValid){
        next();
      }
    }
    catch{
      res.redirect('/login');
    }
}