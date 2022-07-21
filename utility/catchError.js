const appError = require("./appError")

const catchError=(func)=>{
  return (req,res,next,Model,options,options2)=>{
    func(req,res,next,Model,options,options2).catch(err=>next(new appError(err.message,404)))
  }
}

module.exports=catchError