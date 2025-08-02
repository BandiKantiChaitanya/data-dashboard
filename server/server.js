// import express
const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const chartRouter = require('./Routes/ChartRoutes')
const cors=require('cors')

// initialize app
const app=express()

// middleware
const allowedOrigins = [
  'https://data-dashboard-goox3th76-bandikantichaitanyas-projects.vercel.app',
  'https://data-dashboard-kohl.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174'
];
app.use(cors({
  origin:  function(origin, callback){
    if(!origin) return callback(null, true); // allow REST clients like Postman
    if(allowedOrigins.includes(origin)){
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'), false);
    }
  },
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
app.listen(process.env.PORT,()=>{
    console.log('Server listening on port 5000')
})