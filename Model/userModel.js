const mongoose=require('mongoose')
const validator=require('validator')

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
    validate:[validator.isStrongPassword,'Siz kuchliroq password kiriting !']
  },
  // passwordConfirm:{
  //   type:String,
  //   required:[true,"Parolni qayta kiriting !"],
  //   validate:{validator:function(val){
  //     return val===this.password
  //   },message:'Password bilan bir xil bo\'lsin!'}
  // }
},{
  toJSON:{virtuals:true}
})

userschema.virtual('reviews',{
  ref:'reviews',
  localField:'_id',
  foreignField:'user'
})

const User=mongoose.model('users',userschema)

module.exports=User