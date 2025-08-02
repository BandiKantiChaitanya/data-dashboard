// import express
const express=require('express')
const { CreateChart, getAllCharts, updateChart } = require('../Controllers/ChartController')
const chartRouter=express.Router()

chartRouter.post('/createChart',CreateChart)

chartRouter.get('/allCharts',getAllCharts)

chartRouter.put('/updateChart/:id',updateChart)


module.exports=chartRouter
