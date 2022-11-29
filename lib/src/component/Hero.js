import React, { useState } from "react";
import Heroimge from './data/Heros-img.json'

 const Hero =(props)=>{
    // console.log(Heroimge);
    const [data,setData] = useState(props.data)
    return <div className="container-hero">
        <div>
    <img src={`https://cdn.cloudflare.steamstatic.com${data.img}`}/>
        </div>
        <h2>{data.localized_name}</h2>
        <div className="all">
            <h3>{data['all_pick']} match</h3>
            <h3>winrate : {(data['all_win']/data['all_pick']*100).toFixed(2)}% </h3>
        </div>
        <div className="pro">
            <h3>{data['pro_pick']} match</h3>
            <h3>winrate : {(data['pro_win']/data['pro_pick']*100).toFixed(2)}% </h3>
        </div>
        <div className="T1">
            <h3>{data['T1_pick']} match</h3>
            <h3>winrate : {(data['T1_win']/data['T1_pick']*100).toFixed(2)}% </h3>
        </div>
        <div className="T2">
            <h3>{data['T2_pick']} match</h3>
            <h3>winrate : {(data['T2_win']/data['T2_pick']*100).toFixed(2)}% </h3>
        </div>
        <div className="T3">
            <h3>{data['T3_pick']} match</h3>
            <h3>winrate : {(data['T3_win']/data['T3_pick']*100).toFixed(2)}% </h3>
        </div>
        <div>
            
        </div>
        

    </div>
   
 }

 export default Hero