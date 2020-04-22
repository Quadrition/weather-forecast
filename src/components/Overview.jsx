import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Box from "@material-ui/core/Box";
import CurrentWeatherOverview from "./CurrentWeatherOverview";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1, 1),
  },
}));

export default function Overview(props) {
  const classes = useStyles();

  return (
    <SwipeableDrawer
      className={classes.drawer}
      anchor="left"
      open={props.open}
      onClose={props.onOverviewClose}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Box flexGrow={1}>
          <Typography variant="h6">Overview</Typography>
        </Box>
        <IconButton onClick={props.onOverviewClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <CurrentWeatherOverview />
      <Divider />
    </SwipeableDrawer>
  );
}
