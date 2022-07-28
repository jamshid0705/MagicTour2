const express=require('express')
const viewController=require('../Controller/viewController')

const Rout=express.Router()

Rout.route('/overview').get(viewController.getAllTour)

Rout.route('/tour/:id').get(viewController.getoneTour)

Rout.route('/login').get(viewController.login)


module.exports=Rout