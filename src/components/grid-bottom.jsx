import React from 'react'
import { Grid, Paper, Tooltip } from "@mui/material";

const BottomGrid = ({ assets: ASSETS }) => {
    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item>
                        <Tooltip
                            sx={{ padding: "10px" }}
                            title="BBC"
                            disableFocusListener
                            disableTouchListener
                        >
                            <Paper
                                sx={{
                                    height: 250,
                                    width: 250,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                                    backgroundImage: `url(${ASSETS + "/bbc.svg"})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    borderRadius: 8,
                                }}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip
                            title="Cartoon Network"
                            sx={{ padding: "10px" }}
                            disableFocusListener
                            disableTouchListener
                        >
                            <Paper
                                sx={{
                                    height: 250,
                                    width: 250,

                                    backgroundColor: (theme) =>
                                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                                    backgroundImage: `url(${ASSETS + "/cartoon.svg"})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    borderRadius: 8,
                                }}
                            />
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip
                            title="Discovery"
                            sx={{ padding: "10px" }}
                            disableFocusListener
                            disableTouchListener
                        >
                            <Paper
                                sx={{
                                    height: 250,
                                    width: 250,
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                                    backgroundImage: `url(${ASSETS + "/discovery.png"})`,
                                    backgroundPosition: "center",
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                    borderRadius: 8,
                                }}
                            />
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default BottomGrid
