import React from "react";
import { Grid, Paper, Tooltip } from "@mui/material";
const channels = [
  "setanta.png",
  "premier.png",
  "uefa.jpg",
  "netflix.png",
  "universal.png",
  "cooking.jpg",
];

const TopGrid = ({ assets: ASSETS }) => {
  return (
    <Grid sx={{ flexGrow: 1 }}  spacing={4}>
      <Grid spacing={4} item xs={12}>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          {channels.map((channel, idx) => (
            <Grid item key={idx}>
              <Tooltip
                title={channel.split(".")[0]}
                sx={{ padding: "10px" }}
                disableFocusListener
                disableTouchListener
              >
                <Paper
                  sx={{
                    height: 200,
                    width: 200,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                    backgroundImage: `url(${ASSETS + `/${channel}`})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    borderRadius: 8,
                  }}
                />
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TopGrid;
