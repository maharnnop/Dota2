import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Infohero =(props)=>{
const [adventageList,setAdventageList] =useState([])
const [adventageHtml,setAdventageHtml] =useState([])
const [disadventageList,setDisadventageList] =useState([])
const [disadventageHtml,setDisadventageHtml] =useState([])
const [role,setRole] = useState({})
    useEffect(()=>{
        axios.get(`https://api.opendota.com/api/heroes/${props.detail.id}/matchups`)
        .then((res)=>{
            console.log(res.data);
            let cleanData = res.data.map((item)=>{
                return {...item,
                    winrate:(item.wins/item.games_played*100)
                }
            })
            cleanData.sort((a, b) => {
                return  b[`winrate`]-a[`winrate`]
            })
            setAdventageList(cleanData.slice(0, 5))
         
            setDisadventageList(cleanData.slice(-5))

        })
        .catch((err)=>{
            console.log(err);
        })

        axios.get(`https://api.opendota.com/api/scenarios/laneRoles/?hero_id=${props.detail.id}`)
        .then((res)=>{
            let roleObj ={
                1:0,
                2:0,
                3:0,
                4:0
            }
            res.data.forEach(item => {
                roleObj[`${item.lane_role}`]= parseInt(roleObj[`${item.lane_role}`])+parseInt(item.games)
                
            });
            console.log(roleObj);
          setRole(roleObj)
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    useEffect(()=>{
        let list = adventageList.map((item)=>{
           return  props.data.find((hero)=> hero.id === item.hero_id)
        })
        let listHtml =list.map((item,index)=>{
            return <div>
                <img src={`https://cdn.cloudflare.steamstatic.com${item.icon}`} title={item.localized_name}/>
                <p>{(adventageList[index].winrate).toFixed(2)}%</p>
                </div>
        })
        setAdventageHtml(listHtml)
    },[adventageList])

    useEffect(()=>{
        let list = disadventageList.map((item)=>{
           return  props.data.find((hero)=> hero.id === item.hero_id)
        })
        let listHtml =list.map((item,index)=>{
            return <div>
                <img src={`https://cdn.cloudflare.steamstatic.com${item.icon}`} title={item.localized_name}/>
                <p>{(disadventageList[index].winrate).toFixed(1)}%</p>
                </div>
        })
        setDisadventageHtml(listHtml)
    },[disadventageList])

    return <div>
                <ReactPlayer
          url='https://thumbs.gfycat.com/SmallAshamedAcaciarat-mobile.mp4'
          className='react-player'
          playing
          width='300px'
          height='250px'
        />
       
        <img src={`https://cdn.cloudflare.steamstatic.com${props.detail.icon}`}/>
        <h1>{props.detail.localized_name}</h1>
        <img src={`https://cdn.cloudflare.steamstatic.com${props.detail.img}`}/>
        <h1>Role</h1>
        <img src="https://i.imgur.com/XlWrQUh.gif" />
        <h1>Adventage</h1>
        {adventageHtml}
        <h1>Disadventage</h1>
        {disadventageHtml}
    </div>
}

export default Infohero