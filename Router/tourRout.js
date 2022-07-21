const express=require('express')
const tourController=require('../Controller/tourController')

const Router=express.Router()
const reviewRout=require('../Router/reviewRout')


Router.route('/').get(tourController.getAllTour).post(tourController.addTour)

Router.route('/:id').patch(tourController.updateTour).get(tourController.getOneTour).delete(tourController.deleteTour)
Router.use('/:tourId/reviews',reviewRout)


module.exports=Router