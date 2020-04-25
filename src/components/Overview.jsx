import React from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import { mdiArrowLeft } from "@mdi/js";
import Icon from "@mdi/react";
import Scrollbars from "react-custom-scrollbars";
import CurrentWeatherOverview from "./CurrentWeatherOverview";
import LocationCard from "./LocationCard";
import allCities from "../city.list.json";

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
  searchTextField: {
    margin: theme.spacing(0, 2, 2, 2),
  },
  citiesSubText: {
    margin: theme.spacing(1, 2),
  },
}));

export default function Overview(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [searchCities, setSearchCities] = React.useState([]);

  const handleChangeSearch = (e) => {
    if (e.target.value.trim().length >= 4) {
      const searched = allCities.filter((city) =>
        city.name
          .toLocaleLowerCase()
          .includes(e.target.value.toLocaleLowerCase())
      );
      setSearchCities(searched);
    } else {
      setSearchCities([]);
    }
  };

  return (
    <SwipeableDrawer
      className={classes.drawer}
      anchor="left"
      open={props.open}
      onClose={props.onOverviewClose}
      onOpen={props.onOverviewOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Box flexGrow={1}>
          <Typography variant="h6">Overview</Typography>
        </Box>
        <IconButton onClick={props.onOverviewClose}>
          <Icon path={mdiArrowLeft} title="Arrow left" size={1} />
        </IconButton>
      </div>
      <Divider />
      <CurrentWeatherOverview />
      <Divider style={{ margin: theme.spacing(2, 0, 0, 0) }} />
      <Typography
        className={classes.citiesSubText}
        color="textSecondary"
        display="block"
        variant="caption"
      >
        Selected cities
      </Typography>
      {props.selectedCities.map((city) => (
        <LocationCard city={city} onCityRemove={props.onSelectedCityRemove} />
      ))}
      <Divider style={{ margin: theme.spacing(2, 0, 0, 0) }} />
      <Typography
        className={classes.citiesSubText}
        color="textSecondary"
        display="block"
        variant="caption"
      >
        All cities
      </Typography>
      <TextField
        id="standard-basic"
        label="Search by name"
        className={classes.searchTextField}
        onChange={handleChangeSearch}
      />
      <Scrollbars>
        {searchCities
          .filter((city) => !city.selected)
          .map((city) => (
            <LocationCard city={city} onCityAdd={props.onSelectedCityAdd} />
          ))}
      </Scrollbars>
    </SwipeableDrawer>
  );
}
