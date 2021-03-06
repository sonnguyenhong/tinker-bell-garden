 const Event = require('../models/hoatdong.js')
 const path = require('path')

 const { mutipleMongooseToObject } = require('../../util/mongoose')
 const { mongooseToObject } = require('../../util/mongoose')
 class eventController {
     showListEvent(req, res, next) {
         // res.render('sukien/manageEvent')
         Event.find({})
             .then(events => {
                
                 res.render('sukien/manageEvent', {
                     events: mutipleMongooseToObject(events)
                 })
             })
             .catch(err => next(err));
     }

     showAddEvent(req, res, next) {
         res.render('sukien/addEvent',{
            success: false,
            check: false
         })
     }

     showEventDetail(req, res, next) {
         Event.findById(req.params.id)
             .then(event => {
                 res.render('sukien/eventDetail', {
                     event: mongooseToObject(event)
                 })
             })
             .catch(err => next(err));
     }

     store(req, res, next) {
         let image = req.files.image;
         var url = path.resolve(__dirname)
         url = url.replace('\\app\\controllers', '\\public\\img')
         Event.find({},(err,events)=>{
             var check=true;
             events= events.sort((e1,e2)=>{
                if (e1.endDate < e2.endDate){
                    return -1;
                }
                else {
                    return 0;
                }
             })
             
             for(var i=0;i<events.length;i++){
                console.log('start')
                 var d1=new Date(events[i].endDate)
                 var d2=new Date(events[i].startDate)
                 var d3=new  Date(req.body.startDate)
                 var d4=new Date(req.body.endDate)
                 
                if(!(d1<d3||d2>d4))
                {
                    check=false;
                    break
                }
             }
             if(!check){
                res.render('sukien/addEvent',{
                    success: false,
                    check:  "Th???i gian s??? ki???n ???? b??? tr??ng"
                 })
             }
             else{
             image.mv(path.resolve(url, image.name), (err) => {
                Event.create({
                    ...req.body,
                    imageUrl: '/img/' + image.name
                }, (err) => {
                    if (err)  res.render('sukien/addEvent',{
                       success: false,
                       check: "Th??m s??? ki???n kh??ng th??nh c??ng"
                    })
                    else  res.render('sukien/addEvent',{
                       success: "???? th??m s??? ki???n th??nh c??ng",
                       check: false
                    })
                })
            })
        }
         })
         
     }

     deleteEvent(req, res, next) {
         Event.findByIdAndDelete(req.params.id)
             .then(event => {
                 res.redirect('/admin/event')
             })
             .catch(err => next(err))
     }

     updateEvent(req, res, next) {
         let image = null
         var url = path.resolve(__dirname)
         url = url.replace('\\app\\controllers', '\\public\\img')
         if (req.files != null) image = req.files.image
         if (image) image.mv(path.resolve(url, image.name))
         let eve = req.body;
         if (image) eve.imageUrl = '/img/' + image.name;
         Event.findByIdAndUpdate(req.params.id, eve, (err, event) => {
             if (err) next(err)
             res.redirect('/admin/event/' + req.params.id)
         })
     }

 }

 module.exports = new eventController();