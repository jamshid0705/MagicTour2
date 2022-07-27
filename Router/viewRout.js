const express=require('express')
const viewController=require('../Controller/viewController')

const Rout=express.Router()

Rout.route('/overview').get(viewController.getAllTour)

Rout.route('/tour/:id').get(viewController.getoneTour)


module.exports=Rout