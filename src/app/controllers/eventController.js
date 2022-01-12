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
         res.render('sukien/addEvent', {
             success: false
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
         image.mv(path.resolve(url, image.name), (err) => {
             Event.create({
                 ...req.body,
                 imageUrl: '/img/' + image.name
             }, (err) => {
                 if (err) res.render('sukien/addEvent', {
                     success: 'Thêm không thành công'
                 })
                 else res.render('sukien/addEvent', {
                     success: 'Đã thêm sự kiện thành công'
                 })
             })
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