const express=require('express')
const userController=require('../Controller/userController')

const Router=express.Router()

//////// auth controller ///////////////
const authController=require('../Controller/authController')

Router.route('/signup').post(authController.signUp)
Router.route('/signin').post(authController.signin)

Router.route('/').get(authController.protect,userController.getAllUser).post(authController.protect,userController.addUser)
Router.route('/:id').get(authController.protect,userController.getOneUser).patch(authController.protect,userController.updateUser).delete(authController.protect,authController.role(['admin']),userController.deleteUser)

module.exports=Router