import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Switch from "@material-ui/core/Switch";
import DailyChart from "../components/DailyChart";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
  },
  checkBoxItems: {
    display: "flex",
    float: "right",
    alignSelf: "flex-end",
  },
  checkBoxTitles: {
    alignSelf: "center",
    margin: theme.spacing(0, 1),
  },
}));

export default function DailyForecast(props) {
  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event) => {
    if (event.target.checked) {
      setTabValue(1);
    } else {
      setTabValue(0);
    }
  };

  return (
    <Container component="main" maxWidth="lg" className={classes.root}>
      <Box className={classes.checkBoxItems}>
        <Typography className={classes.checkBoxTitles}>Chart</Typography>
        <Switch
          onChange={handleTabChange}
          inputProps={{ "aria-label": "secondary checkbox" }}
        />
        <Typography className={classes.checkBoxTitles}>Table</Typography>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <DailyChart selectedCities={props.selectedCities} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Item Two
      </TabPanel>
    </Container>
  );
}
