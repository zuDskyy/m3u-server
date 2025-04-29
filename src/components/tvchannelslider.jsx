import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const TvChannelSlider = ({ assets }) => {
  const channels = [
    "setanta.png",
    "premier.png",
    "uefa.jpg",
    "netflix.png",
    "universal.png",
    "cooking.jpg",
    "bbc.svg",
    "cartoon.svg",
    "discovery.png",
  ];

  const repeatedChannels = [...channels, ...channels];

  return (
    <div className="w-full overflow-hidden py-10 ">
      <div className="flex animate-marquee whitespace-nowrap gap-10">
        {repeatedChannels.map((img, idx) => (
          <div key={idx} className="flex-shrink-0 w-40 h-24">
            <div
              className="w-full h-full bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage: `url(${assets}/${img})`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvChannelSlider;