const banhangRoutes = require('./banhangRoutes')
const adminEventRouter=require('./adminEvent')
const vipRouter=require('./khachhangvipRoutes')
const thongkengayRouter = require('./thongkengayRoutes')
function route(app) {
    app.use('/admin/banhang', banhangRoutes)
    app.use('/admin/event',adminEventRouter)
    app.use('/admin/vip',vipRouter)

    app.use('/admin/thongkengay',thongkengayRouter)
    app.get('/test', function(req, res){
        res.render('thongke/stats');
    })
    app.get('/thongkethang', function(req, res){
        res.render('thongke/thongkethang');
    })
}

module.exports = route
