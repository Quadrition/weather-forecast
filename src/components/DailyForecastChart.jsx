import React from "react";
import { useTheme, makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const colors = [
  "#d89517",
  "#cb7573",
  "#fe8b74",
  "#3e2733",
  "#c58dbf",
  "#bf5e47",
  "#f2d880",
  "#3bbd94",
  "#7a7d22",
  "#899907",
  "#a1f376",
  "#5fc4ba",
  "#3a3681",
  "#2b24d0",
  "#fbb98c",
  "#2760c7",
  "#3b2b8d",
  "#f6760e",
  "#dba6e3",
  "#9de3a8",
  "#4e29fb",
  "#b44624",
  "#cfde99",
  "#fae9e0",
  "#a9bfb2",
  "#bfe753",
  "#eee743",
  "#687974",
  "#4efe8d",
  "#bd3105",
  "#bcbe27",
  "#e3f670",
  "#a8554f",
  "#cf34e2",
  "#9f50db",
  "#2d088c",
  "#95c48b",
  "#eacb2d",
  "#ef219c",
  "#3899a2",
  "#9826de",
  "#ceb427",
  "#12a9e6",
  "#726106",
  "#fbc7c6",
  "#a6ba6b",
];

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
  },
  filterButton: {
    marginBottom: theme.spacing(4),
  },
  slider: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Chart(props) {
  const [chartData, setChartData] = React.useState([
    {
      amount: 2323,
      time: "sad",
    },
    {
      amount: 1580,
      time: "sad1",
    },
    {
      amount: 3200,
      time: "sad2",
    },
    {
      amount: 1800,
      time: "sad3",
    },
  ]);

  const [series, setSeries] = React.useState([]);

  const classes = useStyles();

  const [filter, setFilter] = React.useState("temp");
  const [slideValue, setSlideValue] = React.useState(5);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setSlideValue(newValue);
  };

  const getFilterTitle = () => {
    switch (filter) {
      case "temp":
        return "Temperature (\u00b0C)";
      case "pressure":
        return "Pressure (hPa)";
      case "wind":
        return "Wind (m/s)";
      case "humidity":
        return "Humidity (%)";
      default:
        return "";
    }
  };

  const theme = useTheme();

  React.useEffect(() => {
    Promise.all(
      props.selectedCities.map((city) =>
        fetch(
          `http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=metric&appid=78e1adc1e41d5f49a06956e69d4225ce`
        )
      )
    )
      .then((responses) => {
        return responses;
      })
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((forecasts) => {
        const data = [];
        const loadedSeries = [];
        for (var i = 0; i < forecasts.length; i++) {
          loadedSeries.push(forecasts[i].city.name);

          for (var j = 0; j < forecasts[i].list.length; j++) {
            if (i === 0) {
              data.push({
                time: forecasts[i].list[j].dt_txt,
              });
            }
            if (j === slideValue * 8) {
              break;
            }
            switch (filter) {
              case "temp":
                data[j][forecasts[i].city.name] =
                  forecasts[i].list[j].main.temp;
                break;
              case "pressure":
                data[j][forecasts[i].city.name] =
                  forecasts[i].list[j].main.pressure;
                break;
              case "wind":
                data[j][forecasts[i].city.name] =
                  forecasts[i].list[j].wind.speed;
                break;
              case "humidity":
                data[j][forecasts[i].city.name] =
                  forecasts[i].list[j].main.humidity;
                break;
              default:
                data[j] = {};
            }
          }
        }
        setSeries(loadedSeries);
        setChartData(data);
      });
  }, [props.selectedCities, filter, slideValue]);

  return (
    <React.Fragment>
      <Box display="flex">
        <Box width="60%">
          <FormControl component="fieldset" className={classes.filterButton}>
            <FormLabel component="legend">Filter</FormLabel>
            <RadioGroup
              aria-label="filter"
              name="filter"
              value={filter}
              className={classes.root}
              onChange={handleChange}
            >
              <FormControlLabel
                value="temp"
                control={<Radio />}
                label="Temperature"
              />
              <FormControlLabel
                value="pressure"
                control={<Radio />}
                label="Pressure"
              />
              <FormControlLabel value="wind" control={<Radio />} label="Wind" />
              <FormControlLabel
                value="humidity"
                control={<Radio />}
                label="Humidity"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box width="40%">
          <FormLabel component="legend" className={classes.slider}>
            Days count
          </FormLabel>
          <Slider
            defaultValue={5}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            value={slideValue}
            onChange={handleSliderChange}
            marks
            className={{ float: "right" }}
            min={1}
            max={5}
          />
        </Box>
      </Box>
      <ResponsiveContainer height={500}>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              {getFilterTitle()}
            </Label>
          </YAxis>
          <Tooltip />
          {series.map((current, index) => (
            <Line
              type="monotone"
              stroke={colors[index]}
              dataKey={current}
              dot={false}
            />
          ))}
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
