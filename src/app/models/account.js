const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

const account = new Schema({
    username:{
        type: String,
        required : true,
    },
    password:{
        type: String,
        required : true,
    },
    name:{
        type: String,
    },
});
     
account.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

module.exports = mongoose.model('account', account)