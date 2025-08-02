import React, { useEffect, useState } from 'react'
import ChartForm from './Components/ChartForm';
import Charts from './Components/Charts';
import ThemeSwitch from './Components/ThemeSwitch';
import './App.css'
import {ToastContainer} from 'react-toastify'



function App() {
 let [data,setData]=useState([])

 const fetchCharts=()=>{
  fetch('http://localhost:5000/api/allCharts')
    .then(res=>res.json())
    .then(data=>setData(data.data))
    .catch(err=>console.log('Error occured',err))
 }
  useEffect(()=>{
    fetchCharts()
  },[])
  // console.log(data)
  function handleModal(){
    const modal=new bootstrap.Modal(document.getElementById('FormModal'))
    modal.show()
  }
 
  return (
    <div className='theme'>
      <div className='header'>
        <h3>Data Dashboard</h3>

     <div className='header2 ' >
      <button onClick={handleModal} className='btn btn-primary' >Add Charts</button>
      <ThemeSwitch className='toggle'/>
     </div>
      </div>
      <Charts data={data} />
      <ChartForm onChartAdded={fetchCharts} />
      <ToastContainer className='' autoClose={2000}/>
    </div>
  )
}

export default App