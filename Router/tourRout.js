const express=require('express')
const tourController=require('../Controller/tourController')
const authController=require('../Controller/authController')

const Router=express.Router()
const reviewRout=require('../Router/reviewRout')

// tourRouter.route('/aggregate').get(auth.role(['admin','lead-guide']),tourController.aggregation)
// tourRouter.route('/aggregate/:year').get(auth.role(['admin','lead-guide']),tourController.dataSort)

Router.route('/').get(tourController.getAllTour).post(authController.role(['admin','lead-guide']),tourController.addTour)
// Router.route('/:id/reviews').get(tourController.getIdReview)
Router.use('/:id/reviews',reviewRout)
Router.route('/:id').patch(authController.role(['admin','lead-guide']),tourController.updateTour).get(tourController.getOneTour).delete(authController.role(['admin','lead-guide']),tourController.deleteTour)



module.exports=Router