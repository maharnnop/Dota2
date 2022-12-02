import React from "react";
import './Home.css'
import ReactPlayer from "react-player";
const Home =()=>{
 return <div className="home-main">
 {/* <h1 className="home-title">inside HOME</h1> */}
  <ReactPlayer
          url='https://thumbs.gfycat.com/SmallAshamedAcaciarat-mobile.mp4'
          className='react-player'
          playing
          width='100vw'
          height='90vh'
        /> 

{/* <ReactPlayer
          url='https://thumbs.gfycat.com/NewEveryBeardedcollie-mobile.mp4'
          className='react-player'
          playing
          loop
          width='100vw'
          height='90vh'
        />  */}


 </div>

}
export default Home