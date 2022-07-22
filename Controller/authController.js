const User = require("../Model/userModel");
const catchError2 = require("../utility/catchError2");
const appError=require('../utility/appError')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const catchError = require("../utility/catchError2");

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

  console.log(await bcrypt.compare(password,user.password))
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


module.exports={signUp,signin,protect,role}