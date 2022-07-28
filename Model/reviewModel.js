const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
  review:{
    type:String,
    required:[true,'Siz review yozing !']
  },
  rating:{
    type:Number,
    max:5,
    min:1,
    required:[true,'Siz rating kiriting !']
  },
  tour:{
    type:String,
  },
  user:{
    type:mongoose.Schema.ObjectId,
    ref:'users'
  },
  createAt:{
    type:Date,
    default:Date.now()
  }
})

reviewSchema.index({user:1,tour:1},{unique:true})

// reviewSchema.pre('save',function(){
  
// })
const Review=mongoose.model('reviews',reviewSchema)

module.exports=Review