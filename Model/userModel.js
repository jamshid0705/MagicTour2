const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')

const userschema=new mongoose.Schema({
  name:{
    type:String,
    required:[true,"siz name kiriting !"],
    trim:true
  },
  email:{
    type:String,
    required:[true,"siz email kiriting !"],
    unique:[true,"Bunday emaillik user mavjud !"],
    // validate:[validator.isEmail,"to\'g\'ri email kiriting !"]
  },
  role:{
    type:String,
    required:[true,'Siz role kirting !'],
    enum:['user','admin','guide','lead-guide'],
    default:'uder'
  },
  photo:{
    type:String,
  },
  password:{
    type:String,
    required:[true,'Siz password kirting'],
    minlength:8,
    validate:[validator.isStrongPassword,'Siz kuchliroq password kiriting !'],
    select:false
  },
  passwordConfirm:{
    type:String,
    required:[true,"Parolni qayta kiriting !"],
    validate:{validator:function(val){
      return val===this.password
    },message:'Password bilan bir xil bo\'lsin!'}
  }
},{
  toJSON:{virtuals:true}
})

userschema.virtual('reviews',{
  ref:'reviews',
  localField:'_id',
  foreignField:'user'
})

userschema.pre('save',async function(next){
   if(!this.isModified('password')){
    return next()
   }
   const hash=await bcrypt.hash(this.password,12)

   this.password=hash
   this.passwordConfirm=undefined

   next()
})

const User=mongoose.model('users',userschema)

module.exports=User