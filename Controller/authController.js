const User = require("../Model/userModel");
const catchError2 = require("../utility/catchError2");
const appError=require('../utility/appError')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const catchError = require("../utility/catchError2");
const mail=require('../utility/mail')
const crypto=require('crypto')


/////// craete token //////////
const createToken=(id)=>{
  return jwt.sign({id:id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES_IN})
}

////// add cookie //////////
const cookieSave=(req,res,token)=>{
  res.cookie('jwt',token,{
    maxAge:1*24*60*60*1000,
    httpOnly:true,
    secure:req.protocol==='https'?true:false
  })
}

////// sign up //////////////
const signUp=catchError2(async(req,res,next)=>{
  const user=await User.create({
    name:req.body.name,
    email:req.body.email,
    role:req.body.role,
    photo:req.body.photo,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm
  })

  const token=createToken(user._id)
  cookieSave(req,res,token)

  res.status(200).json({
    status:'success',
    token:token,
    data:user
  })
})


//////////// sign in /////////
const signin=catchError2(async(req,res,next)=>{
  const {email,password}=req.body
  if(!email && !password){
    next(new appError('siz email bilan password kiritishingiz kerak !',404))
  }

  const user=await User.findOne({email:email}).select('+password')
  if(!user){
    return next(new appError('Bunday user mavjud emas !',404))
  }

  // console.log(await bcrypt.compare(password,user.password))
  if(!(await bcrypt.compare(password,user.password))){
    return next(new appError('Password ni togri kirting!',404))
  }

  const token=createToken(user._id)

  cookieSave(req,res,token)

  res.status(200).json({
    status:'success',
    token:token
  })
})

///////////// protect /////////////////

const protect=catchError2(async(req,res,next)=>{
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1]
  }

  if(!token){
    return next(new appError('sizning tokeningiz notogri !',404))
  }

  const tokencha=jwt.verify(token,process.env.JWT_SECRET_KEY)

  const user=await User.findOne({_id:tokencha.id})

  if(!user){
    return next(new appError('Bunday user mavjud emas !',404))
  }

  if(token){
    // console.log(Date.now()/1000)
    // console.log(tokencha.exp)
    if(tokencha.exp<=Date.now()/1000){
      return next(new appError('Tokenning vaqti tugagan !',404))
    }
  }

  req.user=user
  next()
})

////////// role ////////////

const role=(roles)=>{
  return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return next(new appError('Siz budnay huquqga ega emassiz !',404))
    }
    next()
  }
}

////////// forgot password ///////////
const forgotpassword=catchError2(async(req,res,next)=>{
  const email=req.body.email
  if(!email){
    return next(new appError('siz email kiritng !',404))
  }

  const user=await User.findOne({email:email})

  if(!user){
    return next(new appError("bunday user mavjud emas !",404))
  }

  const token=user.resetToken()
  await user.save({validateBeforeSave:false})
  console.log(req.protocol)
  const resetLink=`${req.protocol}://${req.headers.host}/api/v1/users/resentpassword/${token}`
  const subject='Assalom'
  const html=`<h3 >Resent Link <a style="color:red" href="${resetLink}">👉Submit</a></h3>`
  const to='jamshidshamshod0705@gmail.com'

  mail({subject,html,to})

  res.status(200).json({
    status:'success',
    data:token
  })
})

/////////////// resent password ////////////////
const resentpassword=catchError2(async(req,res,next)=>{
  const token=req.params.token

  if(!token){
    return next(new appError('Siz token olishingiz kerak'))
  }

  const tokenhash=crypto.createHash('sha256').update(token).digest('hex')

  const user=await User.findOne({
    resetTokenHash:tokenhash,
    resetTokenVaqt:{$gte:Date.now()}
  })

  if(!user){
    return next(new appError('Tokenningiz xato !',404))
  }

  if(!req.body.password && !req.body.passwordConfirm){
    return next(new appError('Yangi password kirting!',404))
  }

  user.password=req.body.password,
  user.passwordConfirm=req.body.passwordConfirm,
  user.resetTokenHash=undefined,
  user.resetTokenVaqt=undefined,

  await user.save()

  const tokenNew=createToken(user._id)
  cookieSave(req,res,tokenNew)

  res.status(200).json({
    status:'success',
    token:tokenNew
  })
})


////////////// update password ///////////////
const updatepassword=catchError2(async(req,res,next)=>{
  if(!req.body.oldpassword && !req.body.newpassword && !req.body.passwordConfirm){
    return next(new appError('passwordlarni toliq kirting !',404))
  }
  if(req.body.oldpassword===req.body.newpassword){
    return next(new appError('Eski password bilan bir xil bolmasligi kerak !',404))
  }

  // console.log(req.user.id)

  const user=await User.findOne({_id:req.user.id}).select('+password')
  console.log(user)
  const tekshir=await bcrypt.compare(req.body.oldpassword,user.password)
  // console.log(tekshir)

  if(!tekshir){
    return next(new appError('Siz xato password kiritdingiz !',404))
  }

  user.password=req.body.newpassword,
  user.passwordConfirm=req.body.passwordConfirm

  await user.save({validateBeforeSave:false})

  const token=createToken(user._id)

  cookieSave(req,res,token)

  res.status(200).json({
    status:'success',
    token:token,
    user:user.password
  })
})


///////// update me ///////////

const updateme=catchError2(async(req,res,next)=>{

  const user=await User.findOne({_id:req.user.id})

  if(!user){
    return next(new appError('Bunday user mavjud emas !',404))
  }

  user.email=req.body.email || user.email
  user.photo=req.body.photo || user.photo
  user.name=req.body.name || user.name

  await user.save({validateBeforeSave:false})

  const token=createToken(user.id)

  cookieSave(req,res,token)
  
  res.status(200).json({
    status:'success',
    token:token,
    user:user
  })
})

module.exports={signUp,signin,protect,role,forgotpassword,resentpassword,updatepassword,updateme}