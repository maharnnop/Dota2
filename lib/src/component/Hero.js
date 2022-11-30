import React, { useEffect, useState } from "react";
import axios from "axios";
import './Hero.css'
import Infohero from './Infohero.js'
import { Link } from "react-router-dom";

const Hero = (props) => {
  const [dataHeroAll, setDataHeroAll] = useState([]);
  useEffect(() => {
    setDataHeroAll(props.data);
  }, []);

  function changeOverImg(e, item) {
    e.preventDefault();
    e.target.src = `https://cdn.cloudflare.steamstatic.com${item.img}`;
  }
  function changeLeaveImg(e, item) {
    e.preventDefault();
    e.target.src = `https://cdn.cloudflare.steamstatic.com${item.icon}`;
  }

  const imgHeroALL = dataHeroAll.map((item,index) => {
    return (
      <Link to={`/heroes/${item.localized_name}`} key={index}>
      <img className="icon-hero"
        onMouseOver={(e) => {
            changeOverImg(e, item);
        }}
        onMouseLeave={(e) => {
            changeLeaveImg(e, item);
          }}


        src={`https://cdn.cloudflare.steamstatic.com${item.icon}`}
        alt={item.localized_name}
        title={item.localized_name}
      />
      </Link>
    );
  });

  return (
    <div>
      <h1> inside Team</h1>

      {/* <form onSubmit={selectHero}>
        <input className='rankInput' name='rank' list="rank" placeholder='Rank'/>
        <datalist id="rank">
            {dropDownList} 
        </datalist>
        <input  type='submit' value='Submit' />
        </form> */}
      {imgHeroALL}
    </div>
  );
};

export default Hero;
