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
  let data
  if(req.params.id){
    data=Review.find({tour:req.params.id})
  }
  else{
    data=Review
  }
  getAll(req,res,next,data,options,options2)
}

///////// get one ///////////////////
const getOneReview=(req,res,next)=>{
  getOne(req,res,next,Review,options,options2)
}

////////// add //////////////////////
const addReview=(req,res,next)=>{
  if(req.params.id){
    let data={
      review:req.body.review,
      rating:req.body.rating,
      tour:req.params.id,
      user:req.body.user
    }
    add(data,res,next,Review)
  }
  else{
    add(req,res,next,Review)
  }
  
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
