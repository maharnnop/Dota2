import React, { useEffect, useState } from "react";
import axios from "axios";
import './Hero.css'
import Infohero from './Infohero.js'

const Hero = () => {
  const [dataHeroAll, setDataHeroAll] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.opendota.com/api//heroStats")
      .then((res) => {
        console.log(res.data);
        setDataHeroAll(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function changeOverImg(e, item) {
    e.preventDefault();
    e.target.src = `https://cdn.cloudflare.steamstatic.com${item.img}`;
  }
  function changeLeaveImg(e, item) {
    e.preventDefault();
    e.target.src = `https://cdn.cloudflare.steamstatic.com${item.icon}`;
  }

  const imgHeroALL = dataHeroAll.map((item) => {
    return (
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
