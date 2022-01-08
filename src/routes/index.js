const banhangRoutes = require('./banhangRoutes')
const adminEventRouter=require('./adminEvent')
const vipRouter=require('./khachhangvipRoutes')
const thongkeRouter = require('./thongkeRoutes')
function route(app) {
    app.use('/admin/banhang', banhangRoutes)
    app.use('/admin/event',adminEventRouter)
    app.use('/admin/vip',vipRouter)

    app.use('/admin/thongke',thongkeRouter)
    app.get('/test', function(req, res){
        res.render('thongke/stats');
    })
    
}

module.exports = route
