import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
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

export default function CurrentWeatherOverview() {
  const classes = useStyles();
  const theme = useTheme();

  const [weather, setWeather] = React.useState(undefined);

  React.useEffect(() => {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=Novi%20Sad&appid=78e1adc1e41d5f49a06956e69d4225ce"
    )
      .then((res) => res.json())
      .then((json) => {
        setWeather(json);
      });
  }, []);

  const WeatherMain = () => {
    if (weather !== undefined) {
      return weather.weather[0].main;
    } else {
      return "";
    }
  };

  const WeatherDescription = () => {
    if (weather !== undefined) {
      return weather.weather[0].description;
    } else {
      return "";
    }
  };

  const WeatherIcon = () => {
    if (weather !== undefined) {
      return (
        <Avatar
          alt="Current Weather"
          className={classes.weatherImage}
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
      );
    } else {
      return <CircularProgress />;
    }
  };

  const WeatherTemp = () => {
    if (weather !== undefined) {
      return weather.main.temp;
    } else {
      return "";
    }
  };

  const WeatherHumidity = () => {
    if (weather !== undefined) {
      return weather.main.humidity;
    } else {
      return "";
    }
  };

  const WeatherWind = () => {
    if (weather !== undefined) {
      return weather.wind.speed;
    } else {
      return "";
    }
  };

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
        <Typography variant="h5">Novi Sad, RS</Typography>
      </Box>
      <Box className={classes.headerBox}>
        <WeatherIcon />
      </Box>
      <Box
        className={classes.headerBox}
        style={{ margin: theme.spacing(0, 0, 1, 0) }}
      >
        <Typography variant="h6">
          <WeatherMain />
        </Typography>
      </Box>
      <Box
        className={classes.headerBox}
        style={{ margin: theme.spacing(0, 0, 2, 0) }}
      >
        <Typography variant="subtitle2">
          <WeatherDescription />
        </Typography>
      </Box>
      <Box className={classes.infoBox}>
        <Icon
          path={mdiCoolantTemperature}
          title="Location"
          size={0.7}
          className={classes.locationIcon}
        />
        <Typography variant="subtitle1" className={classes.infoBoxText}>
          temperature:
        </Typography>
        <Box flexGrow={1}>
          <Typography variant="subtitle1" className={classes.infoBoxValue}>
            <WeatherTemp />
          </Typography>
        </Box>
      </Box>
      <Box className={classes.infoBox}>
        <Icon
          path={mdiWaterPercent}
          title="Location"
          size={0.7}
          className={classes.locationIcon}
        />
        <Typography variant="subtitle1" className={classes.infoBoxText}>
          humidity:
        </Typography>
        <Box flexGrow={1}>
          <Typography variant="subtitle1" className={classes.infoBoxValue}>
            <WeatherHumidity />
          </Typography>
        </Box>
      </Box>
      <Box className={classes.lastInfoBox}>
        <Icon
          path={mdiWeatherWindy}
          title="Location"
          size={0.7}
          className={classes.locationIcon}
        />
        <Typography variant="subtitle1" className={classes.infoBoxText}>
          wind speed:
        </Typography>
        <Box flexGrow={1}>
          <Typography variant="subtitle1" className={classes.infoBoxValue}>
            <WeatherWind />
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
}
