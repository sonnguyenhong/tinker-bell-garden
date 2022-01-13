const banhangRoutes = require('./banhangRoutes')
const adminEventRouter = require('./adminEvent')
const vipRouter = require('./khachhangvipRoutes')
const banveRouter = require('./banveRoutes')
const thongkeRouter = require('./thongkeRoutes')
const authRouter = require('./authRoute')
const authMiddleware = require('../app/middleware/auth')
const CSVCRoutes = require('./CSVCRoutes')

function route(app) {
   // app.use('/', authMiddleware.requireAuth)
    app.use('/admin/banhang', banhangRoutes)
    app.use('/admin/event', adminEventRouter)
    app.use('/admin/vip', vipRouter)
    app.use('/admin/banve', banveRouter)
    app.use('/admin/thongke',thongkeRouter)
    app.use('/admin/khuvuichoi', CSVCRoutes)
    app.use('/', authRouter)
}

module.exports = route