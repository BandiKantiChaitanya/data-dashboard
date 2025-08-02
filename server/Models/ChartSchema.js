// import express
const mongoose=require('mongoose')
const schema=mongoose.Schema

const ChartSchema=schema({
    chart:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    data:[
        {
            title:String,
            value:Number
        }
    ],
    colour:{
        type:String,
        required:true
    },
    backgroundColour:{
        type:String,
        required:true
    },
    layout: {
        x: Number,
        y: Number,
        w: Number,
        h: Number
    }

},{timeStamps:true})


const Chart=mongoose.model('Chart',ChartSchema)

module.exports=Chart
