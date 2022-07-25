const express=require('express')
const userController=require('../Controller/userController')

const Router=express.Router()

//////// auth controller ///////////////
const authController=require('../Controller/authController')

Router.route('/signup').post(authController.signUp)
Router.route('/signin').post(authController.signin)
Router.route('/forgotpassword').post(authController.protect,authController.forgotpassword)
Router.route('/resentpassword/:token').post(authController.protect,authController.resentpassword)
Router.route('/updatepassword').post(authController.protect,authController.updatepassword)
Router.route('/updateme').post(authController.protect,authController.updateme)

Router.route('/').get(authController.protect,authController.role(['admin','lead-guide']),userController.getAllUser).post(authController.protect,authController.role(['admin','lead-guide']),userController.addUser)
Router.route('/:id').get(authController.protect,authController.role(['admin','lead-guide']),userController.getOneUser).patch(authController.protect,authController.role(['admin','lead-guide']),userController.updateUser).delete(authController.protect,authController.role(['admin','lead']),userController.deleteUser)

module.exports=Router