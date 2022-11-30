import React,{useState,useEffect}from 'react'
import axios, { all } from 'axios'
import Herometa from './Herometa.js'



 const Meta =()=>{
  
    const [herosList, setHeroList] = useState([])
    // const [heros,setHeros] =useState([])
    const [select,setSelect] = useState({
        rank:'pro',
        position:null
    })
    const [heroHtml,setHeroHtml] = useState([])
    // json all rank
    const [rankList,setRankList] = useState({
        1:'Herald',
        2:'Guardian',
        3:'Crusader',
        4:'Archon',
        5:'Legend',
        6:'Ancient',
        7:'Divine',
        8:'Immortal',
        'pro':'Proplayer'
    })
  
    const dropDownList = []
    for (const key in rankList ){
  dropDownList.push(<option  key={key} value={rankList[key]}/>)

    }

    
    //get data from api
    useEffect(()=>{
        const url ="https://api.opendota.com/api/heroStats"
        axios.get(url)
        .then((res)=>{
            
            let stat =[]
            res.data.map((item)=>{
                stat.push({
                    ...item,                   
                    '8_winrate':(item['8_win']/item['8_pick']*100).toFixed(2),
                    '7_winrate':(item['7_win']/item['7_pick']*100).toFixed(2),
                    '6_winrate':(item['6_win']/item['6_pick']*100).toFixed(2),
                    '5_winrate':(item['5_win']/item['5_pick']*100).toFixed(2),
                    '4_winrate':(item['4_win']/item['4_pick']*100).toFixed(2),
                    '3_winrate':(item['3_win']/item['3_pick']*100).toFixed(2),
                    '2_winrate':(item['2_win']/item['2_pick']*100).toFixed(2),
                    '1_winrate':(item['1_win']/item['1_pick']*100).toFixed(2),
                    'pro_winrate':(item['pro_win']/item['pro_pick']*100).toFixed(2),
                })
            })
          
            stat.sort((a, b) => {
                return  b[`${select.rank}_winrate`]-a[`${select.rank}_winrate`]
                
            })
            
            setHeroList(stat.slice(0, 10))
            
            let heros =  stat.slice(0, 10).map((item,index)=>{
                return <Herometa key={index} rank={select.rank} data={item}/>
               })
               setHeroHtml(heros)
            
        })
        .catch((err)=>{
            console.log(err);
        })

    },[select.rank])
       
    // useEffect(()=>{
    //     let heros =  herosList.map((item,index)=>{
    //         return <Hero key={index} data={item}/>
    //        })
    //        console.log(heros);
    //        setHeroHtml(heros)
    //        console.log(herosList)},[herosList])


       const selectRank =(e)=>{
        e.preventDefault()
        
        let keyRank = Object.keys(rankList).find(key => rankList[key] === e.target.rank.value)
        
        setSelect({
            ...select,
            rank:keyRank
        })
   
        e.target.rank.value =''
     
       }
    //    const handleChange = (e)=>{
    //     e.preventDefault()
    //     rankInput = e.target.value
      
    //    }
    
    return <div className='meta'>
        <h1>inside Meta</h1>

        <form onSubmit={selectRank}>
        <input className='rankInput' name='rank' list="rank" placeholder='Rank'/>
        <datalist id="rank">
            {dropDownList} 
        </datalist>
        <input  type='submit' value='Submit' />
        </form>


        <div className=''>
            <div className='title'>
               <h2>Hero</h2>
               <h2>{rankList[`${select.rank}`]}</h2>
               {select.rank !== 'pro' && <img className='icon-rank' src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${select.rank}.png`} />}
               {/* <div>
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
                </div>  */}
            </div>
           
            {heroHtml}
            
        </div>
        </div>
 }
 export default Meta