const Tour=require('../Model/tourModel')
const catchError2=require('../utility/catchError2')

const getAllTour=catchError2(async(req,res,next)=>{
  const data=await Tour.find()
  console.log(data)

  res.status(200).render('overview',{
    tours:data
  })
})

/////// get on //////

const getoneTour=catchError2(async(req,res,next)=>{
  const data=await Tour.findById(req.params.id).populate({
    path:'guides'
  })

  console.log(data)
  res.status(200).render('tour',{
    tour:data
  })
})

module.exports={getAllTour,getoneTour}