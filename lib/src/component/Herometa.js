import React, { useEffect, useState } from "react";
import Heroimge from './data/Heros-img.json'


 const Herometa =(props)=>{
    // console.log(Heroimge);
    const [data,setData] = useState({})
    const [rank, setRank] =useState('')
    useEffect(()=>{
        setData(props.data)
        setRank(props.rank)
    },[props.data])
    return <div className="container-hero">
        <div>
    <img src={`https://cdn.cloudflare.steamstatic.com${data.img}`}/>
        </div>
        <h2>{data.localized_name}</h2>
        <div className="pick">
            <h3>picked : {data[`${rank}_pick`]} games</h3>
          
        </div>
        <div className="win">
            <h3>win : {data[`${rank}_win`]} games</h3>    
        </div>
        <div className="winrate">
            <h3>winrate : {data[`${rank}_winrate`]}%</h3>
            <div style={{backgroundColor:`grey`, width:'200px', height:'20px'   }}>
                <div style={{backgroundColor:`green`, width:`${data[`${rank}_winrate`]}%`, height:'100%'  }}></div>
            </div>  
        </div>
        <div className="chart">
         
           
        </div>
    
        <div>
            
        </div>
        

    </div>
   
 }

 export default Herometa