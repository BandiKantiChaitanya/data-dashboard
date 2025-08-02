// import express
const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const chartRouter = require('./Routes/ChartRoutes')
const cors=require('cors')

// initialize app
const app=express()

// middleware
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));

app.use(express.json())
dotenv.config()

app.use('/api',chartRouter)


// connect mongoose
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log('Error occured',err)
})


// connect to a port
app.listen('5000',()=>{
    console.log('Server listening on port 5000')
})