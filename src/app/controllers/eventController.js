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
             .catch(next);
     }

     showAddEvent(req, res, next) {
         res.render('sukien/addEvent')
     }

     showEventDetail(req, res, next) {
         Event.findById(req.params.id)
             .then(event => {
                 res.render('sukien/eventDetail', {
                     event: mongooseToObject(event)
                 })
             })
             .catch(next);
     }

     store(req, res, next) {
         let image = req.files.image;
         var url = path.resolve(__dirname)
         url = url.replace('\controllers', 'public\\img')
         image.mv(path.resolve(url, image.name), (err) => {
             Event.create({
                 ...req.body,
                 imageUrl: '/img/' + image.name
             }, (err) => {
                 if (err) next();
                 else res.redirect('/admin/event')
             })
         })
     }

     deleteEvent(req, res, next) {
         Event.findByIdAndDelete(req.params.id)
             .then(event => {
                 res.redirect('/admin/event')
             })
             .catch(next)
     }

     updateEvent(req, res, next) {
         let image = null
         var url = path.resolve(__dirname)
         url = url.replace('\controllers', 'public\\img')
         if (req.files != null) image = req.files.image
         if (image) image.mv(path.resolve(url, image.name))
         let eve = req.body;
         if (image) eve.imageUrl = '/img/' + image.name;
         Event.findByIdAndUpdate(req.params.id, eve, (err, event) => {
             if (err) console.log(err)
             res.redirect('/admin/event/' + req.params.id)
         })
     }

 }

 module.exports = new eventController();