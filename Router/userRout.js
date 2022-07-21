const express=require('express')
const userController=require('../Controller/userController')

const Router=express.Router()

Router.route('/').get(userController.getAllUser).post(userController.addUser)
Router.route('/:id').get(userController.getOneUser).patch(userController.updateUser).delete(userController.deleteUser)

module.exports=Router