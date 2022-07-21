const app=require('./app')
require('./db')


app.listen(process.env.PORT,()=>{
  console.log(`${process.env.PORT} - port sizni tinglamoqda !`)
})