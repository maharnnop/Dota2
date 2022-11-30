import React,{useState,useEffect} from 'react';
import {Link,Route,Routes} from 'react-router-dom'
import './App.css';
import Home from './component/Home.js'
import Meta from './component/Meta';
import Hero from './component/Hero';
import About from './component/About';
import Infohero from './component/Infohero';
import axios from 'axios';

function App() {
const [data,setData] =useState([])
const [heroDetail,setHeroDetail] =useState([])
useEffect(()=>{
  axios
  .get("https://api.opendota.com/api//heroStats")
  .then((res) => {
    console.log(res.data);
    setData(res.data);

    let heroData = res.data.map((item,index)=>{
      return <Route key={index} path={`/heroes/${item.localized_name}`} element={<Infohero detail={item}/>}/>
  })
  setHeroDetail(heroData)
  console.log(heroData);

  })
  .catch((err) => {
    console.log(err);
  });
},[])

  return (
    <div >
      <nav >
        <Link to='/'><h1>HOME</h1></Link>
        <Link to='/meta'><h1>META</h1></Link>
        <Link to='/heroes'><h1>HEROES</h1></Link>
        <Link to='/about'><h1>ABOUT</h1></Link>
      </nav>
      <main>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/meta' element={<Meta data ={data}/>} />
        <Route path='/heroes' element={<Hero data = {data}/>} />
        <Route path='/about' element={<About/>} />
        {heroDetail}
      </Routes>
      </main>
      
    </div>
  );
}

export default App;
