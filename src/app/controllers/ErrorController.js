class ErrorController {

    // [GET] /404
    get404(req, res, next) {
        res.render('error/404')
    }

}

module.exports = new ErrorController()