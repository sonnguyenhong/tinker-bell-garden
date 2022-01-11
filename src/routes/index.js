const banhangRoutes = require('./banhangRoutes')
const adminEventRouter=require('./adminEvent')
const vipRouter=require('./khachhangvipRoutes')
const CSVCRoutes = require('./CSVCRoutes')

function route(app) {
    app.use('/admin/banhang', banhangRoutes)
    app.use('/admin/event',adminEventRouter)
    app.use('/admin/vip',vipRouter)
    app.use('/admin/khuvuichoi', CSVCRoutes)
}

module.exports = route
