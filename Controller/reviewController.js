const Review=require('../Model/reviewModel')
const {getAll,getOne,add,update,deleteData}=require('./handlerController')


const options={
  path:'tour'
}

const options2={
  path:'user'
}
////////// get all reviews ////////////
const getAllReview=(req,res,next)=>{
  getAll(req,res,next,Review,options,options2)
}

///////// get one ///////////////////
const getOneReview=(req,res,next)=>{
  getOne(req,res,next,Review)
}

////////// add //////////////////////
const addReview=(req,res,next)=>{
  add(req,res,next,Review)
}

////////// update /////////////////
const updateReview=(req,res,next)=>{
  update(req,res,next,Review)
}

////////// delete /////////////////
const deleteReview=(req,res,next)=>{
  deleteData(req,res,next,Review)
}


module.exports={getAllReview,getOneReview,updateReview,addReview,deleteReview}
