import React, { useState, useEffect } from "react";
import axios from "axios";
import Herometa from "./Herometa.js";
import "./Meta.css";

const Meta = (props) => {
  const [herosList, setHeroList] = useState([]);
  // const [heros,setHeros] =useState([])
  const [select, setSelect] = useState({
    rank: "pro",
    position: null,
  });
  // const [heroHtml,setHeroHtml] = useState([])
  // json all rank
  const [rankList, setRankList] = useState({
    1: "Herald",
    2: "Guardian",
    3: "Crusader",
    4: "Archon",
    5: "Legend",
    6: "Ancient",
    7: "Divine",
    8: "Immortal",
    pro: "Proplayer",
  });

  const dropDownList = [];
  for (const key in rankList) {
    dropDownList.push(<option key={key} value={rankList[key]} />);
  }

  //get data from api
  useEffect(() => {
    let stat = [];
    props.data.map((item) => {
      stat.push({
        ...item,
        "8_winrate": ((item["8_win"] / item["8_pick"]) * 100).toFixed(2),
        "7_winrate": ((item["7_win"] / item["7_pick"]) * 100).toFixed(2),
        "6_winrate": ((item["6_win"] / item["6_pick"]) * 100).toFixed(2),
        "5_winrate": ((item["5_win"] / item["5_pick"]) * 100).toFixed(2),
        "4_winrate": ((item["4_win"] / item["4_pick"]) * 100).toFixed(2),
        "3_winrate": ((item["3_win"] / item["3_pick"]) * 100).toFixed(2),
        "2_winrate": ((item["2_win"] / item["2_pick"]) * 100).toFixed(2),
        "1_winrate": ((item["1_win"] / item["1_pick"]) * 100).toFixed(2),
        pro_winrate: ((item["pro_win"] / item["pro_pick"]) * 100).toFixed(2),
      });
    });

    stat.sort((a, b) => {
      return b[`${select.rank}_winrate`] - a[`${select.rank}_winrate`];
    });

   

    let heros = stat.slice(0, 10).map((item, index) => {
      return <Herometa key={index} rank={select.rank} data={item} />;
    });
    setHeroList(heros);
  }, [select.rank]);


  const selectRank = (e) => {
    e.preventDefault();

    let keyRank = Object.keys(rankList).find(
      (key) => rankList[key] === e.target.rank.value
    );

    setSelect({
      ...select,
      rank: keyRank,
    });

    e.target.rank.value = "";
  };

  return (
    <div className="meta-containner">
      
        <div className="meta-title">
          <h1 className="rnk">RANK : {rankList[`${select.rank}`]}</h1>
          {select.rank !== "pro" && (
            <img
              className="icon-rank"
              src={`https://www.opendota.com/assets/images/dota2/rank_icons/rank_icon_${select.rank}.png`}
            />
          )}
          <form onSubmit={selectRank}>
            <input
              className="rankInput"
              name="rank"
              list="rank"
              placeholder="Rank"
            />
            <datalist id="rank">{dropDownList}</datalist>
            <input className="submit" type="submit" value="FIND!" />
          </form>
        </div>

        {herosList}
     
    </div>
  );
};
export default Meta;
