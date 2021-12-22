const adminEventRouter=require('./adminEvent')

function router(app){
    app.use('/admin/event',adminEventRouter)
}
module.exports=router;