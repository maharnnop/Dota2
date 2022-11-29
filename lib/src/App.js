import React,{useState,useEffect} from 'react';
import {Link,Route,Routes} from 'react-router-dom'
import './App.css';
import Home from './component/Home.js'
import Meta from './component/Meta';
import Team from './component/Team';
import About from './component/About';

function App() {
  return (
    <div >
      <nav >
        <Link to='/'><h1>HOME</h1></Link>
        <Link to='/meta'><h1>META</h1></Link>
        <Link to='/team'><h1>TEAM</h1></Link>
        <Link to='/about'><h1>ABOUT</h1></Link>
      </nav>
      <main>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/meta' element={<Meta/>} />
        <Route path='/team' element={<Team/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
      </main>
      
    </div>
  );
}

export default App;
