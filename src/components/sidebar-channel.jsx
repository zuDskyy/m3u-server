import React, { useContext, useState } from "react";
import ChannelContext from "../context/useChannelContext";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const ChannelSidebar = ({ drawerOpen, setDrowerOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const ASSETS = process.env.REACT_APP_M3U_ASSETS;
  const { m3uData } = useContext(ChannelContext);

  const filteredChannels = m3uData?.filter((channel) => {
    const inGroup = selectedGroup
      ? channel.group.groupname === selectedGroup
      : true;
    const matchesSearch = channel.tvname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return inGroup && matchesSearch;
  });

  const groupCounts = m3uData?.reduce((acc, channel) => {
    const group = channel.group.groupname;
    acc[group] = (acc[group] || 0) + 1;
    return acc;
  }, {});

  const uniqueGroups = [...new Set(m3uData?.map((ch) => ch.group.groupname))];
  return (
    <>
      {drawerOpen && (
        <div className=" w-full md:w-[350px] md:h-[90vh] bg-slate-800 text-white p-4 rounded shadow-lg z-20">
          <input
            type="text"
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white mb-4"
          />

          <div className="flex overflow-x-auto gap-2 mb-4">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#0f172a" }}
              onClick={() => setSelectedGroup(null)}
            >
              All ({m3uData?.length})
            </Button>
            {uniqueGroups.map((group) => (
              <Button
                key={group}
                variant="contained"
                className="whitespace-nowrap text-ellipsis overflow-hidden"
                sx={{
                  paddingLeft: 10,
                  paddingRight: 10,
                  backgroundColor:
                    selectedGroup === group ? "#2563eb" : "#0f172a",
                }}
                onClick={() => setSelectedGroup(group)}
              >
                {group} ({groupCounts[group]})
              </Button>
            ))}
          </div>

          <ul className="max-h-[70vh] overflow-y-auto pr-2">
            {filteredChannels?.map((item) => (
              <li key={item.id} className="border-b border-gray-700">
                <Link
                  to={`channel/${item.id}`}
                  className="flex items-center gap-3 w-full p-2 hover:bg-gray-700 rounded"
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
                  <span>{item.tvname}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ChannelSidebar;
