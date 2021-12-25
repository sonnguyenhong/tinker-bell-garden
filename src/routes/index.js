const banhangRoutes = require('./banhangRoutes')
const adminEventRouter=require('./adminEvent')

function route(app) {
    app.use('/admin/banhang', banhangRoutes)
    app.use('/admin/event',adminEventRouter)
}

module.exports = route
