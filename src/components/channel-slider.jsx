import React, { useContext, useState } from "react";
import ChannelContext from "../context/useChannelContext";
import { Link } from "react-router-dom";

const ChannelSlider = ({ title, groupname }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const { m3uData } = useContext(ChannelContext);

  const ASSETS = process.env.REACT_APP_M3U_ASSETS;

  const filteredChannels = m3uData
    ?.filter((item) => item?.group?.groupname?.toLowerCase() === groupname)
    .slice(0, 30);

  return (
    <div className="w-full container mx-auto  p-2 ">
      {/* <h4 className="text-2xl text-white font-bold mb-4">{title}</h4> */}
      <ul className="flex gap-4 px-4 py-2 w-max animate-scroll-horizontal">
        {filteredChannels?.map((item) => (
          <li key={item.id} className="flex-shrink-0 w-60">
            <Link
              to={`channel/${item.id}`}
              className="flex items-center gap-3 p-2 bg-gray-800 hover:bg-gray-700 rounded shadow"
            >
              {item?.tvlogo && (
                <img
                  src={item.tvlogo}
                  onError={(e) => {
                    e.currentTarget.src = ASSETS + "/zplayer.jpg";
                  }}
                  alt="logo"
                  className="w-20 h-10 object-contain"
                />
              )}
              <span className="text-white">{item.tvname}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelSlider;
