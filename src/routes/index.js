const LoginRouter = require('./login');
const express = require('express')
const loginController = require('../app/Controllers/LoginController')
const router = express.Router()
var auth = require('../middlewares/auth')
function route(app){
    app.use('/login',LoginRouter)
    //app.use('/login',LoginRouter)
    app.get('/',auth.requireAuth, (req, res, next) => {
        res.render('home')
    })
}

module.exports = route;