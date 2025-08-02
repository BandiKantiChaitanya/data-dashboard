import React, { useState } from 'react'
import {useFieldArray, useForm} from 'react-hook-form'
import '../App.css'
import { toast } from 'react-toastify'
import { MdDelete } from "react-icons/md";

function ChartForm({onChartAdded}) {
   
    const {register,handleSubmit,control,formState:{errors},reset}=useForm({
            defaultValues: {
                data: [{ title: '', value: '' }]
            } 
        })

    const {fields,append,remove}=useFieldArray({
        control,
        name:'data'
    })


    const onSubmit=async (formData)=>{
        try {
            const Charts=await fetch('https://data-dashboard-backend-jvtm.onrender.com/api/allCharts')
            const existingCharts=await Charts.json()
            const index=existingCharts.length
            const layout={
                x:(index % 3)*4 ,
                y:Math.floor(index /3) * 3,
                w:4,
                h:3
            }
            const datawithLayout={...formData,layout}
            const response=await fetch('https://data-dashboard-backend-jvtm.onrender.com/api/createChart',{
                method:'POST',
                headers:{
                     'Content-type':'application/JSON',
                },
                body:JSON.stringify(datawithLayout)
            })
            
            if(response.status===200){
                handleClose()
               
                toast.success('Table has been created')
                if (onChartAdded) onChartAdded();
            }

        } catch (error) {
            toast.error("Error while creating table")
            console.log('Error occured',error)
        }
        
    }
    
    function handleClose(){
        const modalInstance=bootstrap.Modal.getInstance(document.getElementById('FormModal'))
        modalInstance.hide()
        
        reset({
                chart: '',
                title: '',
                colour: '',
                backgroundColour: '',
                data: [{ title: '', value: '' }]
            });
    }

  return (
    <div className='modal fade-modal modal-box theme' id='FormModal' tabIndex='-1' >
        <div className="modal-dialog modal-xl modal-dialog-scrollable modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5>Create Your Own Chart</h5>
                    <button className="btn-close" data-bs-dismiss='modal' onClick={handleClose} ></button>
                </div>
                <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
                <label className='form-label'>Type of chart</label>
                <select  className='form-select' {...register('chart',{required:true})} >
                    <option value="" >Select</option>
                    <option value="Bar">Bar</option>
                    <option value="Line">Line</option>
                    <option value="Curved">Curved</option>
                    <option value="CurvedFill">Curved Filled</option>
                    <option value="Area">Area</option>
                    <option value="Scatter">Dotted</option>
                </select>
                {errors.chart && <p className="text-danger">Chart is required</p>}
            </div>  
                
            <div className='mb-3'>
                <label className="form-label">Name of Chart (Title)</label>
                <input type="text" className="form-control" {...register('title',{required:true})} />
                
                {errors.title && <p className='text-danger' >Title is required</p> }
            </div>

            <div className='mb-3'>
                <p>Data for Chart</p>
                {
                    fields.map((field,index)=>(
                        <div key={index} className='row mb-2' >

                            <div className="col-6">
                                <input type="text" className='form-control ' {...register(`data.${index}.title`,{required:true})} placeholder='Label'  />
                                {errors.data?.[index]?.title && <p className='text-danger'>Label is required</p> }
                            </div>

                            <div className="col-4">
                            <input type="number" step="any" className='form-control' {...register(`data.${index}.value`,{required:true})} placeholder='Value in Numbers'  />
                             {errors.data?.[index]?.value && <p className='text-danger'>Value is required</p> }
                            </div>

                             <div className="col-2">
                                {fields.length > 1 && (
                                <button type="button" className="btn btn-danger" onClick={() => remove(index)}><MdDelete /></button>
                                )}
                             </div>
                        </div>
                    ))
                }
                 <button type="button" className="btn btn-primary btn-sm mt-1" onClick={() => append({ title: '', value: '' })}>Add More</button>
                
            </div>

            <div className='mb-3'>
                <label className='form-label'>Graph Colour</label>
                <select  className='form-select' {...register('backgroundColour',{required:true})}  >
                    <option value="">Select</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="black">Black</option>
                    <option value="yellow">Yellow</option>
                    <option value="orange">Orange</option>
                    <option value="cyan">Cyan</option>
                    <option value="#FF6347">Tomato</option>
                    <option value="#8A2BE2">Blue Violet</option>
                    <option value="#00CED1">Dark Turquoise</option>
                </select>
                {errors.backgroundColour && <p className='text-danger' >Background Colour is required</p> }
            </div>

            <div className='mb-3'>
                <label className='form-label' >Outline Colour (border)</label>
                <select className='form-select' {...register('colour',{required:true})} >
                    <option value="">Select</option>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="black">Black</option>
                    <option value="yellow">Yellow</option>
                    <option value="orange">Orange</option>
                    <option value="cyan">Cyan</option>
                    <option value="#FF6347">Tomato</option>
                    <option value="#8A2BE2">Blue Violet</option>
                    <option value="#00CED1">Dark Turquoise</option>
                    <option value="#DAA520">Goldenrod</option>
                </select>
                {errors.colour && <p className='text-danger' >Border Colour is required</p> }
            </div>

            
            <button type='submit' className='btn btn-success' >Submit</button>
        </form>
                </div>
            </div>
        </div>
       
    </div>
  )
}

export default ChartForm