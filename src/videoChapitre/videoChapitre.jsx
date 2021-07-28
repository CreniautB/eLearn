import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import VideoDisplayed from "../videoDisplayed/videoDisplayed";

import '../homePage/homePage.css'
import './videoChap.css'

const VideoChapitre = ({idChap,titleChap, setRecordedChunks, idVideo, setIdVideo, endIt}) => {

  const [count, setCount] = useState(0)
  const videooo = React.useRef(null)
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [play, setPlay] = React.useState(false)

  const constraints = {
    'video': true,
    'audio': true
}
navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
        console.log('Got MediaStream:', stream);
    })
    .catch(error => {
        console.error('Error accessing media devices.', error);
    });

  useEffect(() => {
    if(play){
    const interval = setInterval(() => {
      setCount(count => count - 1);
      if (count <= 0 ){
        if (!endIt){
        setIdVideo(idVideo+1);
        setTimeout(() => { getCounter() }, 1000);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }}, [count]);

  function getCounter() {
    setCount(videooo.current.getDuration() + 40 )
  }

  function clickNext() {
    setIdVideo(idVideo+1);
    getCounter()
  }  

    const handleStartCaptureClick = React.useCallback(() => {
      getCounter();
      setPlay(true);
      setCapturing(true)
      mediaRecorderRef.current =  new MediaRecorder(webcamRef.current.stream, {
        mimeType: "video/webm"
      });
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
    }, [webcamRef, setCapturing, mediaRecorderRef]);

    const handleDataAvailable = React.useCallback(
      ({ data }) => {
        if (data.size > 0) {
          setRecordedChunks((prev) => prev.concat(data));
        }
      },
      [setRecordedChunks]
    );
     
    return (
        <div className='videoChapContainer'>

          <button className='button titleChapitre'>{titleChap}</button>
          
          <div className="mainContainer">
              <div className='videoContainerCours'>
                
                {!capturing ? (
                  <h1 className='button startVideoBtn' onClick={handleStartCaptureClick}>
                    Cliquez ici pour lancer la video<br/> Et commencez l'enregistrement</h1>
                        ) : ( <></>) }

                  <VideoDisplayed idVideo ={idVideo} idChap = {idChap} videooo={videooo} play={play}/>
                  <div className='controllersVideo'>
                    {capturing ? (<button className='button ctrlBtn' onClick={() => clickNext() }> Video Suivante </button>) : (<></>)}
                  </div>
              </div>

            <div className='webCamContainer'>
              <Webcam width="400px" className='webCam' audio={true} ref={webcamRef} autoPlay={true} />
              {capturing ? (<span className='button'>Il vous reste <strong>{parseInt(count)}</strong> seconde <br/>Pour cette question</span>) : (<></>)}
              </div>
          </div>

        </div>
    )
    
}

export default VideoChapitre