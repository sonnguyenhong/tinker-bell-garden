const banhangRoutes = require('./banhangRoutes')
const adminEventRouter=require('./adminEvent')
const vipRouter=require('./khachhangvipRoutes')

function route(app) {
    app.use('/admin/banhang', banhangRoutes)
    app.use('/admin/event',adminEventRouter)
    app.use('/admin/vip',vipRouter)
}

module.exports = route
