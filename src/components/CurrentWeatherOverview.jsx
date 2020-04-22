import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Icon from "@mdi/react";
import Avatar from "@material-ui/core/Avatar";
import {
  mdiMapMarker,
  mdiCoolantTemperature,
  mdiWeatherWindy,
  mdiWaterPercent,
} from "@mdi/js";

const useStyles = makeStyles((theme) => ({
  locationIcon: {
    marginRight: theme.spacing(1),
    alignSelf: "center",
  },
  headerBox: {
    display: "flex",
    justifyContent: "center",
  },
  weatherImage: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
  infoBox: {
    display: "flex",
    margin: theme.spacing(0, 2),
  },
  infoBoxText: {
    marginLeft: theme.spacing(0.5),
  },
  infoBoxValue: {
    marginLeft: theme.spacing(0.8),
  },
  lastInfoBox: {
    display: "flex",
    margin: theme.spacing(0, 2, 3, 2),
  },
}));

export default function CurrentWeatherOverview(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <React.Fragment>
      <Box
        className={classes.headerBox}
        style={{ margin: theme.spacing(3, 0, 2, 0) }}
      >
        <Icon
          path={mdiMapMarker}
          title="Location"
          size={1}
          className={classes.locationIcon}
        />
        <Typography variant="h5">Novi Sad</Typography>
      </Box>
      <Box className={classes.headerBox}>
        <Avatar
          alt="Current Weather"
          className={classes.weatherImage}
          src="http://openweathermap.org/img/wn/10d@2x.png"
        />
      </Box>
      <Box
        className={classes.headerBox}
        style={{ margin: theme.spacing(0, 0, 1, 0) }}
      >
        <Typography variant="h6">Rain</Typography>
      </Box>
      <Box
        className={classes.headerBox}
        style={{ margin: theme.spacing(0, 0, 2, 0) }}
      >
        <Typography variant="subtitle2">tiny rain</Typography>
      </Box>
      <Box className={classes.infoBox}>
        <Icon path={mdiCoolantTemperature} title="Location" size={0.7} />
        <Typography variant="subtitle1" className={classes.infoBoxText}>
          temperature:
        </Typography>
        <Box flexGrow={1}>
          <Typography variant="subtitle1" className={classes.infoBoxValue}>
            23
          </Typography>
        </Box>
      </Box>
      <Box className={classes.infoBox}>
        <Icon path={mdiWaterPercent} title="Location" size={0.7} />
        <Typography variant="subtitle1" className={classes.infoBoxText}>
          vlaznost:
        </Typography>
        <Box flexGrow={1}>
          <Typography variant="subtitle1" className={classes.infoBoxValue}>
            1016
          </Typography>
        </Box>
      </Box>
      <Box className={classes.lastInfoBox}>
        <Icon path={mdiWeatherWindy} title="Location" size={0.7} />
        <Typography variant="subtitle1" className={classes.infoBoxText}>
          wind speed:
        </Typography>
        <Box flexGrow={1}>
          <Typography variant="subtitle1" className={classes.infoBoxValue}>
            0.47
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
}
