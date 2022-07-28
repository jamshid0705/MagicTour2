const Tour=require('../Model/tourModel')
const catchError2=require('../utility/catchError2')
const Review=require('../Model/reviewModel')

const getAllTour=catchError2(async(req,res,next)=>{
  const data=await Tour.find()
  // console.log(data)

  res.status(200).render('overview',{
    tours:data
  })
})

/////// get on //////

const getoneTour=catchError2(async(req,res,next)=>{
  const data=await Tour.findById(req.params.id).populate({
    path:'guides'
  }).populate('reviews')
  const reviews=await Review.find({tour:req.params.id}).populate('user')  

  console.log(data)
  console.log(reviews)
  res.status(200).render('tour',{
    tour:data,
    review:reviews
  })
})

//// login /////////

const login=catchError2(async(req,res,next)=>{
  res.status(200).render('login')
})

module.exports={getAllTour,getoneTour,login}