const Tour = require('../Model/tourModel')
const catchError = require('../utility/catchError')
const Review=require('../Model/reviewModel')
const {getAll,getOne,add,update,deleteData}=require('./handlerController')


const options={
  path:'guides'
}

const options2={
  path:'reviews'
}

///////// get all tour /////////
const getAllTour=(req,res,next)=>{
  getAll(req,res,next,Tour,options,options2)
}

///////// get one tour /////////
const getOneTour=(req,res,next)=>{
  getOne(req,res,next,Tour,options,options2)
}

//////// add tour /////////////
const addTour=(req,res,next)=>{
  add(req,res,next,Tour)
}

//////// update ////////////////
const updateTour=(req,res,next)=>{
  update(req,res,next,Tour)
}

////////// delete /////////////
const deleteTour=(req,res,next)=>{
  deleteData(req,res,next,Tour)
}

const getIdReview=catchError(async(req,res,next)=>{
  console.log('11111111111')
  const data=await Review.find({tour:req.params.tourId})

  res.status(200).json({
    data:data
  })
})

module.exports={getAllTour,getOneTour,updateTour,deleteTour,addTour,getIdReview}