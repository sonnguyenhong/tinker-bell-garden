class HomeController {

    // [GET] /admin
    index(req, res, next) {
        console.log('inhere')
        res.render('admin/admin')
    }

}

module.exports = new HomeController