const express=require('express')
const reviewController=require('../Controller/reviewController')
const authController=require('../Controller/authController')

const Router=express.Router({mergeParams:true})



Router.route('/').get(reviewController.getAllReview).post(authController.role(['user']),reviewController.addReview)
Router.route('/:id').get(reviewController.getOneReview).delete(authController.role(['user','admin']),reviewController.deleteReview).patch(authController.role(['user']),reviewController.updateReview)

module.exports=Router
