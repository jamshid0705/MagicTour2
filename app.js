const express=require('express')
const appError = require('./utility/appError')
const app=express()
const userRout=require('./Router/userRout')
const tourRout=require('./Router/tourRout')
const reviewRout=require('./Router/reviewRout')


app.use(express.json())

app.use('/api/v1/tours',tourRout)
app.use('/api/v1/users',userRout)
app.use('/api/v1/reviews',reviewRout)

////////// err page //////////////
// app.all('*',function(req,res,next){
//   next(new appError('Not page !',404))
// })


/////////// all err ///////////////
app.use((err,req,res,next)=>{
  err.status=err.status || "fail",
  err.statusCode=err.statusCode || 404,
  err.message=err.message || 'Not found !'

  if(err.message==='invalid signature'){
    err.message='Sizning tokeningiz yaroq !'
  }

  if(process.env.NODE_CODE==='DEVELOPMENT'){
    res.status(err.statusCode).json({
      status:err.status,
      message:err.message,
      statusCode:err.statusCode,
      stack:err.stack
    })
  }

  if(process.env.NODE_CODE==='PRODUCTION'){
    res.status(err.statusCode).json({
      status:err.status,
      message:err.message,
    })
  }  
})

module.exports=app