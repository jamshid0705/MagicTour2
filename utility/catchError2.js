const appError = require("./appError")

const catchError=(func)=>{
  return (req,res,next)=>{
    func(req,res,next).catch(err=>next(new appError(err.message,404)))
  }
}

module.exports=catchError