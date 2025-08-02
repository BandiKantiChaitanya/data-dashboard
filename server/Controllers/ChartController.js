const  Chart = require("../Models/ChartSchema")


const CreateChart=(req,res)=>{
    try {
        const newChart=new Chart(req.body)
        newChart.save()
        .then((response)=>{
            res.status(200).json({message:'Chart created'})
        })
        .catch((err)=>{
            res.status(400).json({message:'Error occured in creating chart'})
        })
    } catch (error) {
         res.status(500).json({message:'Server Error occured in creating chart',error})
    }
}

const getAllCharts=async(req,res)=>{
    try {
        const response=await Chart.find()
        res.status(200).json({message:'All charts ',data:response})
    } catch (error) {
        res.status(500).json({message:'Server Error occured in fetching data',error})
    }
}

const updateChart=async(req,res)=>{
    try {
        const {id}=req.params
        const {layout}=req.body
        //  console.log(`Updating chart ${id} with layout:`, layout);
        const response=await Chart.findByIdAndUpdate(id,{layout})
        res.status(200).json({message:'Chart Updated'})
    } catch (error) {
        res.status(500).json({message:'Server Error occured in updating chart',error})
    }
}

module.exports={
    CreateChart,
    getAllCharts,
    updateChart
}