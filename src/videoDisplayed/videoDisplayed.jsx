import React, { useState } from "react";
import ReactPlayer from 'react-player'

const VideoDisplayed = ({idVideo, idChap, videooo, play}) => {


    let url = 'videoSource/'+idChap+'/'+idVideo+'.mp4'


  return (
    <div className='videoCours'>
         <ReactPlayer
                className='react-player fixed-bottom'
                url= {url}
                width='500px'
                height='auto'
                controls = {true}
                ref = {videooo}
                playing = {play}
            />
    </div>
    )
};


export default VideoDisplayed