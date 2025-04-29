import React, { useContext, useEffect } from "react";
import ChannelContext from "../context/useChannelContext";
import { useParams } from "react-router-dom";
import Hls from "hls.js";
import CustomVideo from "../components/customVideo/CustomVideo";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import ChannelSlider from "../components/channel-slider";

const M3uPlayer = () => {
  const params = useParams();
  const { id } = params;
  const { m3uData } = useContext(ChannelContext);

  const filteredM3uList = m3uData?.filter((index) => index.id == id);
  const videoData = m3uData?.find((item) => item.id == id);
  const ASSETS = process.env.REACT_APP_M3U_ASSETS;

  useEffect(() => {
    if (videoData) {
      const { title } = videoData;
      const videoSrc = title.file;
      var video = document.getElementById("video");

      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.ERROR, function (event, data) {
          console.error("HLS error", data);
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoSrc;
      }
    }
  }, [filteredM3uList]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <ChannelSlider title={"General"} groupname={"general"} />
      {/* Background effect */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] animate-none"></div>

      {/* Optional particles */}

      <Particles
        options={{
          background: { color: "#0f0c29" },
          particles: {
            number: { value: 60 },
            size: { value: 2 },
            color: { value: "#ffffff" },
            move: { speed: 0.3 },
          },
        }}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />


      {/* Main player container */}
      <div className="absolute container mx-auto md:max-w-[60%] top-40 left-0 right-0 py-5 px-2 z-10">
        {filteredM3uList?.map((item) => (
          <div
            key={item.id}
            className="h-full bg-black/60 rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden"
          >
            {/* Header */}
            <div className="w-full flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-md rounded-t-2xl">
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="w-20 h-20 bg-white/10 rounded-xl overflow-hidden shadow-md border border-white/10 flex items-center justify-center">
                  <img
                    src={item.tvlogo}
                    onError={(e) => {
                      e.currentTarget.src = ASSETS + "/zplayer.jpg";
                    }}
                    alt="logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xl md:text-2xl text-white font-semibold truncate max-w-[70%]">
                  {item.tvname}
                </span>
              </div>
            </div>

            {/* Video */}
            <div className="w-full px-4 py-4">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-white/10">
                <CustomVideo id="video" />
              </div>
            </div>
          </div>
        ))}

        {/* No Channel Selected */}
        {filteredM3uList?.length === 0 && (
          <div className="w-full h-[40vh] flex justify-center items-center">
            <span className="text-white text-xl font-bold uppercase text-center drop-shadow-lg">
              Please select a channel from the playlist
            </span>
          </div>
        )}
      </div>

      {/* Floating Sidebar */}
      {videoData && (
        <div className="absolute right-4 top-40 hidden md:flex flex-col gap-4 p-4 bg-black/30 rounded-xl shadow-xl backdrop-blur-md z-10">
          <div className="text-white text-sm font-bold uppercase">Now Streaming</div>
          <img
            src={videoData.tvlogo}
            onError={(e) => {
              e.currentTarget.src = ASSETS + "/zplayer.jpg";
            }}
            alt="logo"
            className="w-32 h-32 object-contain bg-white/10 rounded-lg border border-white/10"
          />
          <div className="text-white text-center font-medium">{videoData.tvname}</div>
        </div>
      )}
      <div className="absolute bottom-2 left-0 w-full">      <ChannelSlider title={"Movies"} groupname={"movies"} /></div>

      {/* Footer Live Bar */}
      {videoData && (
        <div className="fixed bottom-0 left-0 w-full text-white text-center bg-black/70 py-3 shadow-inner z-50 backdrop-blur-md ">
          🔴 <span className="font-bold">{videoData.tvname}</span> — LIVE Streaming
        </div>
      )}
    </div>
  );
};

export default M3uPlayer;
