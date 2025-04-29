import React from "react";
import { Paper, Tooltip } from "@mui/material";

const ChannelCard = ({ src, height = 250, width = 300, contain }) => {
  return (
    <Tooltip disableFocusListener disableTouchListener>
      <Paper
        sx={{
          height,
          width,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
          backgroundImage: `url(${src})`,
          backgroundPosition: "center",
          backgroundSize: contain ? "contain" : "cover",
          backgroundRepeat: "no-repeat",
          borderRadius: 3,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />
    </Tooltip>
  );
};

export default ChannelCard;
