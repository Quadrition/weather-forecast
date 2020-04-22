import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { mdiMenu } from "@mdi/js";
import Icon from "@mdi/react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={props.onOverviewOpen}
            color="inherit"
            aria-label="menu"
          >
            <Icon path={mdiMenu} title="Menu" size={1} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Weather Forecast
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
