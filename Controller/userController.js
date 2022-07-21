const User=require('../Model/userModel')

const {getAll,getOne,add,update,deleteData}=require('./handlerController')

////////// get all user /////////
const options={
  path:'reviews'
}

const getAllUser=(req,res,next)=>{
  getAll(req,res,next,User,options)
}

///////// get one user //////////
const getOneUser=(req,res,next)=>{
  getOne(req,res,next,User,options)
}

//////// add user //////////////
const addUser=(req,res,next)=>{
  add(req,res,next,User)
}

//////// update //////////////
const updateUser=(req,res,next)=>{
  update(req,res,next,User)
}

//////// delete /////////////
const deleteUser=(req,res,next)=>{
  deleteData(req,res,next,User)
}


module.exports={getAllUser,getOneUser,addUser,updateUser,deleteUser}
