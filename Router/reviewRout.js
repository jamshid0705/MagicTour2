const express=require('express')
const reviewController=require('../Controller/reviewController')

const Router=express.Router({mergeParams:true})
console.log(33333333)
Router.route('/').get(reviewController.getAllReview).post(reviewController.addReview)
Router.route('/:id').get(reviewController.getOneReview).delete(reviewController.deleteReview).patch(reviewController.updateReview)

module.exports=Router
