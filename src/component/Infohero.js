import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import "./Infohero.css";
import Heromodel from "./Heromodel";

const Infohero = (props) => {
  const [adventageList, setAdventageList] = useState([]);
  const [adventageHtml, setAdventageHtml] = useState([]);
  const [disadventageList, setDisadventageList] = useState([]);
  const [disadventageHtml, setDisadventageHtml] = useState([]);
  const [role, setRole] = useState([]);

  let heroName = props.detail.localized_name;
  useEffect(() => {
    axios
      .get(`https://api.opendota.com/api/heroes/${props.detail.id}/matchups`)
      .then((res) => {
        
        let cleanData = res.data.map((item) => {
          return { ...item, winrate: (item.wins / item.games_played) * 100 };
        });
        cleanData.sort((a, b) => {
          return b[`winrate`] - a[`winrate`];
        });
        setAdventageList(cleanData.slice(0, 5));

        setDisadventageList(cleanData.slice(-5));
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(
        `https://api.opendota.com/api/scenarios/laneRoles/?hero_id=${props.detail.id}`
      )
      .then((res) => {
        let roleObj = {
          1: [0, 0],
          2: [0, 0],
          3: [0, 0],
          4: [0, 0],
          all: 0,
        };
        res.data.forEach((item) => {
          roleObj[`${item.lane_role}`][0] =
            parseInt(roleObj[`${item.lane_role}`][0]) + parseInt(item.games);
          roleObj[`${item.lane_role}`][1] =
            parseInt(roleObj[`${item.lane_role}`][1]) + parseInt(item.wins);
          roleObj.all = parseInt(roleObj.all) + parseInt(item.games);
        });
       
        let barchart = [];
        for(let i=1 ; i<=3;i++){
            barchart.push( <div >
         <div className="bar"
          style={{
            backgroundColor: `red`,
            width: "40px",
            height: `${(150 * roleObj[i][0]) / roleObj.all}px`,
          }}
        >
          <div
            style={{
              backgroundColor: `green`,
              height: `${(roleObj[i][1] / roleObj[i][0]) * 100}%`,
              width: "100%",
            }}
          ></div>
        </div> 
        <h4>{roleObj[i][0]} / {((roleObj[i][1] / roleObj[i][0]) * 100).toFixed(0)}%  </h4>
        {/* <h3> win {((roleObj[i][1] / roleObj[i][0]) * 100).toFixed(1)}% */}
        {/* </h3> */}

      </div>)
        }
        

        setRole(barchart);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    let list = adventageList.map((item) => {
      return props.data.find((hero) => hero.id === item.hero_id);
    });
    let listHtml = list.map((item, index) => {
      return (
        <div className="add-hero">
          <img
            src={`https://cdn.cloudflare.steamstatic.com${item.icon}`}
            title={item.localized_name}
          />
          <h4>{adventageList[index].winrate.toFixed(0)}%</h4>
        </div>
      );
    });
    setAdventageHtml(listHtml);
  }, [adventageList]);

  useEffect(() => {
    let list = disadventageList.map((item) => {
      return props.data.find((hero) => hero.id === item.hero_id);
    });
    let listHtml = list.map((item, index) => {
      return (
        <div className="dis-hero">
          <img
            src={`https://cdn.cloudflare.steamstatic.com${item.icon}`}
            title={item.localized_name}
          />
          <h4>{disadventageList[index].winrate.toFixed(0)}%</h4>
        </div>
      );
    });
    setDisadventageHtml(listHtml);
  }, [disadventageList]);


  

return (
    <div className="containner-infohero">
      <div className="title-infohero">
        <img className="icon-heroinfo"
          src={`https://cdn.cloudflare.steamstatic.com${props.detail.icon}`}
        />
        <h1>{props.detail.localized_name}</h1>
      </div>

      <img
        className="img-hero"
        src={`https://cdn.cloudflare.steamstatic.com${props.detail.img}`}
      />
{/* <div id="video-hero">
<ReactPlayer
        url={`https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${props.detail.localized_name.toLowerCase()}.webm`}
        className="video-hero"
        playing
        loop
        width="100%"
        height="100%"
      /></div> */}
      <div id="video-hero">
      <Heromodel name={props.detail.localized_name}/>
      </div>
      <div className="role-lane ">
        <h1>Role : <span>( games / winrate )</span></h1>
        <div className="role-title"> 
        <h3>Safe</h3>
        <h3>Mid</h3>
        <h3>Off</h3>
        </div>
        <div className="h-bar">
        
            {role}
             </div>
      </div>

      

      <h1 id="add">Adventage</h1>

      <div className="add-icon">{adventageHtml}</div>

      <h1 id="dis">Disadventage</h1>
      <div className="dis-icon">{disadventageHtml}</div>

     
    </div>
  );
};

export default Infohero;
