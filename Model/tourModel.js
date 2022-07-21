const mongoose=require('mongoose')
const validator=require('validator')

const tourSchema=new mongoose.Schema({
  startLocation:{
    description:{
      type:String,
      required:[true,"Siz loc kiriting"]
    },
    type:{
      type:String,
      default:'Point',
    },
    coordinates:[Number],
    address:{
      type:String,
      required:[true,"Siz address kirting"]
    }
  },
// locatsiya qo'shish
  locations:[
    {
      description:{
        type:String,
        required:[true,"Siz loc kiriting"]
      },
      type:{
        type:String,
        default:'Point',
      },
      coordinates:[Number],
      day:{
        type:Number,
        required:[true,"Siz day kirting"]
      }
    }
  ],

  name: {
    type: String,
    required: [true, 'nameni kiriting'],
    minlength:[8, '8 tadan kam bo\'lmaligi kk'],
    maxlength:[40,'40 tadan oshmasligi kk']
  },
  price: {
    type: Number,
    required: true,
  },
  // Custom validation
  maxGroupSize: {
    type: Number,
    required: true,

    validate:{validator:function(val){
      return val>1 && Number.isInteger(val)
    },message:'Siz natural son kiritishingiz kk'
  }
  
  },
  duration: {
    type: Number,
    required: true,
    min:[1,'duration ga 1 tadan kam bo\'lmasligi kk'],
    max:[100,'100 dan baland bo\'lmasligi kk']
  },
  difficulty: {
    type: String,
    required: true,
    enum:{values:['easy','medium','difficult'],message:'Siz xato soz kiritdingiz'}
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
  },
  imageCover: {
    type: String,
  },
  images: [String],
  startDates:[Date],

  createAt: {
    type: Date,
    default: Date.now(),
  },
  
  guides:[
    {
      type:mongoose.Schema.ObjectId,
      ref:'users'
    }
  ]
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
})

/////// virtual property func /////////////
tourSchema.virtual('reviews',{
  ref:'reviews',
  localField:'_id',
  foreignField:'tour'
})

const Tour=mongoose.model('tours',tourSchema)

module.exports=Tour