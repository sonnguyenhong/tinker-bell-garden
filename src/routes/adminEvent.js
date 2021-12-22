const express=require('express');
const { route } = require('express/lib/application');
const eventController=require('../controllers/eventController')
const router=express.Router();

router.get('/',eventController.showListEvent)
router.get('/addEvent',eventController.showAddEvent)
router.post('/addEvent',eventController.store)
router.get('/:id/delete',eventController.deleteEvent)
router.post('/:id/update',eventController.updateEvent)
router.get('/:id',eventController.showEventDetail)

module.exports=router