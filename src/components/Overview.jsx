import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

export default function Overview(props) {
  return (
    <SwipeableDrawer
      anchor="left"
      open={props.open}
      onClose={props.onOverviewClose}
    >
      <h2>Overview</h2>
    </SwipeableDrawer>
  );
}
