const banhangRoutes = require('./banhangRoutes')

function route(app) {
    app.use('/admin/banhang', banhangRoutes)
}

module.exports = route