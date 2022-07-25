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


const aggregation=catchError2(async (req,res)=>{
 
  const tourAggre=await Tour.aggregate([
    {$match:{ratingsAverage:{$gte:1,$lte:10}}},
    {$group:{_id:'$difficulty',
             soni:{$sum:1},
             ortachaAver:{$avg:'$ratingsAverage'},
             maxAver:{$min:"$ratingsAverage"},
             minAver:{$max:"$ratingsAverage"}
            }},
    {$sort:{price:-1}},
    {$addFields:{difficulty:'$_id'}},
    {$project:{_id:0}},    
    {$limit:2}    
  ])

  res.status(200).json({
    status:"success",
    data:tourAggre
  })


})

const dataSort=catchError2(async (req,res)=>{

  const sortDataTour=await Tour.aggregate([
    {$unwind:'$startDates'},
    {$match:{startDates:{$gte:new Date(`${req.params.year}-01-01`),$lte:new Date(`${req.params.year}-12-31`)}}},
    {$group:{_id:{$month:"$startDates"},
             tourDates:{$sum:1},
            tours:{$push:'$name'}},
    },
    {$addFields:{monthDate:'$_id'}},
    {$project:{_id:0}},
    {$sort:{tourDates:-1}},
    {$limit:3}
  ])

  res.status(200).json({
    status:"success",
    results:sortDataTour.length,
    data:sortDataTour
  })

})


module.exports={getAllTour,getOneTour,updateTour,deleteTour,addTour,aggregation,dataSort}