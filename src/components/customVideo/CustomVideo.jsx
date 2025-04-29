import React, { useEffect, useRef, useState } from "react";
import "./videoPlayer.css"; // Import the CSS file for styling

const CustomVideo = ({ ...props }) => {
  const ASSETS = process.env.REACT_APP_M3U_ASSETS;
  const videoRef = useRef(null);
  const [playpause, setPlayPause] = useState(false);

  const togglePlayPause = () => {
    const video = videoRef.current;
    setPlayPause((prev) => !prev);
    if (video.paused) {
      var play = video.play();
      if (play !== undefined) {
        play.then(() => {
          console.log("video played");
        }).catch((error) => {
          console.log(error);
        });
      }
    } else {
      video.pause();
    }
  };

  const handleKeyDown = (event) => {
    if (event.code === "Space") {
      togglePlayPause();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
      video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
      video.msRequestFullscreen();
    }
  };

  const turnOnLiveMode = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = videoRef.current.duration;
      videoRef.current.play();
    }
  };

  const changeVolume = (value) => {
    const video = videoRef.current;
    video.volume = value;
  };

  return (
    <div className="video-container">
      <video ref={videoRef} {...props} className="video-player" onClick={togglePlayPause} />
      
      <div className="controls">
        {/* Play/Pause Button */}
        <div className="control-button play-pause" onClick={togglePlayPause}>
          <img
            width={40}
            height={40}
            src={ASSETS + (playpause ? "/pause.png" : "/play.png")}
            alt={playpause ? "Pause" : "Play"}
          />
        </div>

        {/* Volume Control */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          defaultValue="1"
          onChange={(e) => changeVolume(e.target.value)}
          className="volume-slider"
        />

        {/* Live Mode Button */}
        <div onClick={turnOnLiveMode} className="control-button live">
          <img width={40} height={40} src={ASSETS + "/livestream.png"} alt="Live" />
          <span>Live</span>
        </div>

        {/* Fullscreen Button */}
        <div className="control-button fullscreen" onClick={toggleFullScreen}>
          <img width={40} height={40} src={ASSETS + "/fullscreen.png"} alt="Fullscreen" />
        </div>
      </div>
    </div>
  );
};

export default CustomVideo;
