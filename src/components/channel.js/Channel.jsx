// REFACTORED VERSION OF CHANNEL COMPONENT WITH BETTER RESPONSIVENESS AND UI

import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import AddM3uList from "../addM3uList.js/AddM3uList";
import Changelist from "../changelist/Changelist";
import CurrentPlaylist from "../currentlist/CurrentPlaylist";
import CleanButton from "../clean-button";

const Channel = () => {
  const playlist = useSelector((state) => state.user.currentPlaylist);
  const ASSETS = process.env.REACT_APP_M3U_ASSETS;

  const navigate = useNavigate();
  const [addChannelOpen, setAddChannelOpen] = useState(false);
  const [changeChannelList, setChangeChannelList] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="flex  flex-col w-full bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center flex-wrap gap-4 ">
        <span
          onClick={() => navigate("/")}
          className=" flex items-center gap-10 text-white text-xl"
        >
          <Icon color="blue" className="w-20 h-20" name="arrow circle left" />
          <CleanButton />
        </span>

        <div className="flex gap-4 flex-wrap">
          {playlist && <CurrentPlaylist />}

          <Button
            onClick={() => setChangeChannelList(true)}
            variant="outlined"
            sx={{ color: "white", borderColor: "#0f172a" }}
          >
            <img
              width={25}
              height={25}
              src={ASSETS + "/playlist.png"}
              alt="playlist"
              className="mr-2"
            />
            Choose Playlist
          </Button>

          <Button
            onClick={() => setAddChannelOpen(true)}
            variant="outlined"
            sx={{ color: "white", borderColor: "#0f172a" }}
          >
            <img
              width={25}
              height={25}
              src={ASSETS + "/add2.png"}
              alt="add"
              className="mr-2"
            />
            Add Playlist
          </Button>
        </div>
      </div>

      {changeChannelList && (
        <Changelist setChangeChannelList={setChangeChannelList} />
      )}
      {addChannelOpen && <AddM3uList setAddChannelOpen={setAddChannelOpen} />}
    </div>
  );
};

export default Channel;
