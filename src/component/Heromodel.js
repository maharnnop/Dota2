import React from "react";
import ReactPlayer from "react-player";
const Heromodel =(props)=>{
return (
    <ReactPlayer
        url={`https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${props.name.toLowerCase()}.webm`}
        className="video-hero"
        playing
        loop
        width="100%"
        height="100%"
      />
)

}

export default Heromodel