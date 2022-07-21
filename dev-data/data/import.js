const fs=require('fs')
const catchError = require('../../utility/catchError')
const Tour = require('../../Model/tourModel')
const User = require('../../Model/userModel')
const Review = require('../../Model/reviewModel')
require('../../db')

const user=JSON.parse(fs.readFileSync('./dev-data/data/users.json','utf-8'))
const tour=JSON.parse(fs.readFileSync('./dev-data/data/tours.json','utf-8'))
const review=JSON.parse(fs.readFileSync('./dev-data/data/reviews.json','utf-8'))


const add=async()=>{
  await Tour.create(tour)
  await User.create(user)
  await Review.create(review)

  console.log('Databasega yuklandi !')
}

const deleteD=async()=>{
  await Tour.deleteMany()
  await User.deleteMany()
  await Review.deleteMany()
  
  console.log('Database tozalandi !')
  process.exit()
}

if(process.argv[2]==='--delete'){
  deleteD()
}
if(process.argv[2]==='--add'){
  add()
}
console.log(process.argv)


