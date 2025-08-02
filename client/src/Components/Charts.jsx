import { Bar, Line, Scatter } from 'react-chartjs-2'
import { Responsive, WidthProvider } from 'react-grid-layout'
const ResponsiveGridLayout = WidthProvider(Responsive)
import {  Chart as ChartJS, CategoryScale, LinearScale, BarElement,ArcElement,LineElement, Title, Tooltip, Legend,PointElement,Filler, ScatterController } from 'chart.js'



ChartJS.register(CategoryScale,LinearScale,BarElement,ArcElement,LineElement,Title,Tooltip,Legend ,PointElement,Filler, ScatterController)
ChartJS.defaults.font.family = 'Mona Sans';
function Charts({data}) {

    const layout = data.map((item) => ({
                    i: item._id,
                    x: item.layout?.x || 0,
                    y: item.layout?.y || 0,
                    w: item.layout?.w || 4,
                    h: item.layout?.h || 3
            }))

    const handleLayout=async (updateLayout)=>{
        try {
            await Promise.all(
                updateLayout.map((layoutItem)=>
                fetch(`https://data-dashboard-backend-jvtm.onrender.com/api/updateChart/${layoutItem.i}`,{
                    method:'PUT',
                    headers:{
                        'Content-type':'application/JSON'
                    },
                    body:JSON.stringify({
                        layout:{
                            x:layoutItem.x,
                            y:layoutItem.y,
                            w:layoutItem.w,
                            h:layoutItem.h
                        }
                    })
                })
                )
            )
        } catch (error) {
            
        }
    }
    
    const axisColour='black'
    const options={ responsive: true, 
                    maintainAspectRatio: false ,
                    scales: {
                        x: {
                            ticks:{
                                color: axisColour,
                                font:{
                                    // family: 'Mona Sans',
                                    size:14
                                }
                            },
                            border: {
                            display: true,       
                            width: 2,            
                            color: axisColour       
                                },
                            grid: { 
                                display: false 
                            }
                        },
                        y: {
                            ticks:{
                                color: axisColour,
                                font:{
                                    // family: 'Mona Sans',
                                    size:14
                                }
                            },
                            border: {
                            display: true,       
                            width: 2,            
                            color: axisColour      
                                },
                            grid: { display: false }
                        }
                    },
                    
                }
    const CurveOption={...options, 
        elements: {
            line: {
                tension: 0.5,
                borderWidth: 3
                },
            point: {
                radius: 4,
                backgroundColor: '#000'
            }
  }
    }
    let chartData;
  return (
    <div className="charts">
        <ResponsiveGridLayout layouts={{lg:layout} }breakpoint="lg" breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
         cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} rowHeight={100} width={1000} isDraggable={true}
        isResizable={true} compactType={null} onLayoutChange={(layout) => handleLayout(layout)} >
        {
            data.map((item,index)=>{
                const labels=item.data.map((i)=>i.title)
                const value=item.data.map((i)=>i.value)

                let chart
                switch(item.chart){
                    case 'Bar':
                        chartData={
                            labels,
                            datasets:[
                                {
                                    label:item.title,
                                    data:value,
                                    borderColor:item.colour,
                                    backgroundColor:item.backgroundColour,
                                    pointRadius: 6,
                                    borderWidth: 2, 
                                }
                            ]
                        }
                        chart=<Bar data={chartData} options={options}/>
                        break;
                    case "Line":
                        chartData={
                            labels,
                            datasets:[
                                {
                                    label:item.title,
                                    data:value,
                                    borderColor:item.colour,
                                    backgroundColor:item.backgroundColour,
                                    fill:false,
                                    pointBorderColor:'black',
                                    pointRadius: 2,
                                    borderWidth: 4, 
                                }
                            ]
                        }
                        chart= <Line key={index} data={chartData}  options={options}/>
                        break; 

                    case 'CurvedFill':
                        chartData={
                            labels,
                            datasets:[
                                {
                                    label:item.title,
                                    data:value,
                                    borderColor:item.colour,
                                    backgroundColor:item.backgroundColour,
                                    fill:true,
                                    pointBorderColor:'black',
                                    pointRadius: 6,
                                    borderWidth: 2, 
                                }
                            ]
                        }
                        chart=<Line key={index} data={chartData} options={CurveOption} />
                        break;

                        case 'Curved':
                        chartData={
                            labels,
                            datasets:[
                                {
                                    label:item.title,
                                    data:value,
                                    borderColor:item.colour,
                                    backgroundColor:item.backgroundColour,
                                    fill:false,
                                    pointBorderColor:'black',
                                    pointRadius: 6,
                                    borderWidth: 2, 
                                }
                            ]
                        }
                        chart=<Line key={index} data={chartData} options={CurveOption} />
                        break;

                        case 'Area':
                            chartData={
                                labels,
                                datasets:[
                                    {
                                        label:item.title,
                                        data:value,
                                        borderColor:item.colour,
                                        backgroundColor:item.backgroundColour,
                                        fill:true,
                                        pointBorderColor:'black',
                                        pointRadius: 6,
                                        borderWidth: 2, 
                                    }
                                ]
                            }
                            chart=<Line key={index} data={chartData} options={options} />
                        break;

                        case 'Scatter':
                        // Check if title values are numeric or categorical
                        const categories = [...new Set(item.data.map((d) => d.title))]

                        // If all titles are numeric, use numeric x-axis, else map categories to numbers
                        const allNumeric = categories.every((c) => !isNaN(parseFloat(c)))

                        const scatterData = item.data.map((point) => ({
                            x: allNumeric ? parseFloat(point.title) : categories.indexOf(point.title),
                            y: parseFloat(point.value),
                        }))

                        const scatterOptions = {
                            ...options,
                            scales: {
                            x: {
                                type: 'linear',
                                position: 'bottom',
                                ticks: {
                                color: axisColour,
                                font: { size: 14 },
                                callback: allNumeric
                                    ? undefined
                                    : (val) => categories[val] || val, // show category labels for categorical x
                                },
                                border: { display: true, width: 2, color: axisColour },
                                grid: { display: false },
                            },
                            y: { ...options.scales.y },
                            },
                        }

                        chartData = {
                            datasets: [
                            {
                                label: item.title,
                                data: scatterData,
                                backgroundColor: item.backgroundColour,
                                borderColor: item.colour,
                                pointRadius: 6,
                            },
                            ],
                        }

                        chart = <Scatter key={index} data={chartData} options={scatterOptions} />
                        break;

               default:
              chart = <div key={index}>Unknown chart type: {item.chart}</div>
                            }
                        
                return (
                    <div key={item._id}  style={{ width: '100%', height: '100%', padding: '10px',boxSizing: 'border-box' }} >
                        {chart}
                    </div>
                )
                })
        
        }
        </ResponsiveGridLayout>
    </div>
  )
}

export default Charts