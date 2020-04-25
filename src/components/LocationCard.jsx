import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(1, 2),
  },
}));

export default function LocationCard(props) {
  const classes = useStyles();

  let button;

  if (props.city.selected) {
    button = (
      <IconButton size="small" onClick={() => props.onCityRemove(props.city)}>
        <Icon path={mdiMinus} title="Remove" size={1} />
      </IconButton>
    );
  } else {
    button = (
      <IconButton size="small" onClick={() => props.onCityAdd(props.city)}>
        <Icon path={mdiPlus} title="Add" size={1} />
      </IconButton>
    );
  }

  return (
    <Box className={classes.root} variant="outlined" borderColor="grey.500">
      <Box flexGrow={1} style={{ alignSelf: "center" }}>
        <Typography variant="body2">
          {props.city.name}, {props.city.country}
        </Typography>
      </Box>
      {button}
    </Box>
  );
}
