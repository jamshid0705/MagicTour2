const appError = require("../utility/appError");
const catchError = require("../utility/catchError");

//////// response func //////////////
const responseFunc=(res,statusCode,data)=>{
  if(Array.isArray(data)){
    res.status(statusCode).json({
      status:'success',
      results:data.length,
      data:data
    })
  }else{
    res.status(statusCode).json({
      status:'success',
      data:data
    })
  }
}


//////// get All ////////////
const getAll=catchError(async(req,res,next,Model,options,options2)=>{
  let data
  if(options2){
    console.log(1222)
    data=await Model.find().populate(options).populate(options2)
  }
  else if(options){
    console.log('22222222222')
    data=await Model.find().populate(options)
  }
  else{
    data=await Model.find()
  }
  
  responseFunc(res,200,data)
})


///////// get one ///////////
const getOne=catchError(async(req,res,next,Model,options,options2)=>{
  let data
  if(options2){
    data=await Model.findById(req.params.id).populate(options).populate(options2)
  }
  else if(options){
    data=await Model.findById(req.params.id).populate(options)
  }
  else{
    data=await Model.findById(req.params.id)
  }
 

  if(!data){
    return next(new appError('Bunday id lik malumot topilmadi !',404))
  }

  responseFunc(res,200,data)
})


////////// add /////////////
const add=catchError(async(req,res,next,Model)=>{
  const data=await Model.create(req.body)

  responseFunc(res,200,data)
})


//////// update //////////
const update=catchError(async(req,res,next,Model)=>{
  const data =await Model.findByIdAndUpdate(req.params.id)

  if(!data){
    return next(new appError('Bunday id lik malumot topilmadi !',404))
  }

  responseFunc(res,200,data)
})


///////// delete //////////
const deleteData=catchError(async(req,res,next,Model)=>{
  const data=await Model.findByIdAndDelete(req.params.id)

  if(!data){
    return next(new appError('Bunday id lik malumot topilmadi !',404))
  }

  responseFunc(res,200,data)
})

module.exports={getAll,getOne,update,deleteData,add}

