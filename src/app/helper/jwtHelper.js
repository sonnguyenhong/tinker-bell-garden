const account = require('../models/account')
const jwt = require('jsonwebtoken')
function generateToken(accountSchema,secretSignature,expiresTime){
    //console.log('link OK');
    const userData = {
        id : accountSchema._id,
        username : accountSchema.username,
        name : accountSchema.name,
    };
    return jwt.sign(userData,secretSignature,{
        algorithm: "HS256",
        expiresIn: expiresTime,
      });
}

module.exports = {
    generateToken: generateToken,
    // verifyToken : verifyToken,
}
