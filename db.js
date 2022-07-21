const mongoose=require('mongoose')
require('dotenv').config({path:'./config.env'})


mongoose.connect(process.env.DATABASE_URL,{}).then(()=>{
  console.log("Databasega bog\'lanish hosil qilindi!")
}).catch(err=>{
  console.log("Databasega ulanmadi !")
})

module.exports=mongoose