import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

function CurrentPlaylist() {
  const playlist = useSelector((state) => state.user.currentPlaylist);
  const ASSETS = process.env.REACT_APP_M3U_ASSETS;
  return (
    <Button
      className=""
      style={{
        display: "flex",
        alignItems: "center",
        padding: "5px",
        gap: 10,
        border: "1.4px solid black",
        borderRadius: 4,
      }}
    >
      <img
        width={25}
        heigth={25}
        src={ASSETS + "/filesIcon.png"}
        alt={"playlistIcon"}
      />
      <span style={{ color: "white" }}>{playlist.listname}</span>
    </Button>
  );
}

export default CurrentPlaylist;
