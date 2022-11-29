import React,{useState,useEffect}from 'react'
import axios, { all } from 'axios'
import Hero from './Hero.js'



 const Meta =()=>{
    const [herosList, setHeroList] = useState([])
    const [statList,setStateList] =useState([])
    const [select,setSelect] = useState({
        rank:'all',
        position:null
    })
    let rank = ''
    //get data from api
    useEffect(()=>{
        const url ="https://api.opendota.com/api/heroStats"
        axios.get(url)
        .then((res)=>{
            console.log(res.data);

            res.data.sort((a, b) => {
                return  b['8_win']-a['8_win'] 
            })
            setHeroList(res.data.slice(0, 10))
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])
    // data selected from condition 
    useEffect(()=>{
        let stat =[]
       
        herosList.map((item)=>{
            stat.push({
                ...item,
                T1_pick:item['8_pick']+item['7_pick'],
                T1_win:item['8_win']+item['7_win'],
                T2_pick:item['6_pick']+item['5_pick'],
                T2_win:item['6_win']+item['5_win'],
                T3_pick:item['4_pick']+item['3_pick']+item['2_pick']+item['1_pick'],
                T3_win:item['4_win']+item['3_win']+item['2_win']+item['1_win'],
                all_pick:item['8_pick']+item['7_pick']+item['6_pick']+item['5_pick']+item['4_pick']+item['3_pick']+item['2_pick']+item['1_pick'],
                all_win:item['8_win']+item['7_win']+item['6_win']+item['5_win']+item['4_win']+item['3_win']+item['2_win']+item['1_win'],
            })
        })
        setStateList(stat);
        console.log(stat);
    },[herosList])

       let heros = statList.map((item,index)=>{
        return <Hero key={index} data={item}/>
       })
       const selectRank =(e)=>{
        e.preventDefault()
        setSelect({
            ...select,
            rank:rank
        })
       }
       const handleChange = (e)=>{
        e.preventDefault()
        e.target.className = e.target.value
       }
    
    return <div className='meta'>
        <h1>inside Meta</h1>
        <form onSubmit={selectRank}>
        <input className='rank' onChange={handleChange} type='text' placeholder='Rank'/>
        <input type='submit' value='Submit' />
        </form>
        <div className=''>
            <div className='title'>
               <h2>Hero</h2>
               <h2>All</h2>
               <h2>Proplayer</h2>
               <div>
                <img className='icon-rank' src='https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_8.png'/>
                <img className='icon-rank' src='https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_7.png'/>
                </div>
               <div>
               <img className='icon-rank' src='https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_6.png'/>
                <img className='icon-rank' src='https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_5.png'/>
               </div>
               <div>
               <img className='icon-rank' src='https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_4.png'/>
                <img className='icon-rank' src='https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_3.png'/>
                <img className='icon-rank' src='https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_2.png'/>
                <img className='icon-rank' src='https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_1.png'/>
                </div> 
            </div>
            {heros}
        </div>
        </div>
 }
 export default Meta