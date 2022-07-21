const Tour = require('../Model/tourModel')
const catchError2 = require('../utility/catchError2')
const Review=require('../Model/reviewModel')
const {getAll,getOne,add,update,deleteData}=require('./handlerController')


const options={
  path:'guides',
  select:'name'
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

// const getIdReview=catchError2(async(req,res,next)=>{
 
//     console.log(req.params.id)
//     const data=await Review.find({tour:req.params.id})
  
//     res.status(200).json({
//       data:data
//     })
//   })

module.exports={getAllTour,getOneTour,updateTour,deleteTour,addTour}