import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  LineSeries,
  Title,
  Legend,
} from "@devexpress/dx-react-chart-material-ui";
import { withStyles } from "@material-ui/core/styles";
import { Animation } from "@devexpress/dx-react-chart";

const format = () => (tick) => tick;
const legendStyles = () => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
});
const legendLabelStyles = (theme) => ({
  label: {
    paddingTop: theme.spacing(1),
    whiteSpace: "nowrap",
  },
});
const legendItemStyles = () => ({
  item: {
    flexDirection: "column",
  },
});

const legendRootBase = ({ classes, ...restProps }) => (
  <Legend.Root {...restProps} className={classes.root} />
);
const legendLabelBase = ({ classes, ...restProps }) => (
  <Legend.Label className={classes.label} {...restProps} />
);
const legendItemBase = ({ classes, ...restProps }) => (
  <Legend.Item className={classes.item} {...restProps} />
);
const Root = withStyles(legendStyles, { name: "LegendRoot" })(legendRootBase);
const Label = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  legendLabelBase
);
const Item = withStyles(legendItemStyles, { name: "LegendItem" })(
  legendItemBase
);

const useStyles = makeStyles((theme) => ({
  chart: {
    paddingRight: "20px",
  },
  title: {
    whiteSpace: "pre",
  },
}));

const ValueLabel = (props) => {
  const { text } = props;
  return <ValueAxis.Label {...props} text={`${text}%`} />;
};

const titleStyles = {
  title: {
    whiteSpace: "pre",
  },
};
const TitleText = withStyles(titleStyles)(({ classes, ...props }) => (
  <Title.Text {...props} className={classes.title} />
));

export default function DailyChart(props) {
  const classes = useStyles();
  const [chartData, setChartData] = React.useState([]);
  console.log(chartData);

  function Series() {
    return (
      <React.Fragment>
        <LineSeries name="Moscow" valueField="Moscow" argumentField="time" />
        <LineSeries name="London1" valueField="London1" argumentField="time" />
        <LineSeries name="London2" valueField="London2" argumentField="time" />
        <LineSeries name="London3" valueField="London3" argumentField="time" />
        <LineSeries name="London4" valueField="London4" argumentField="time" />
      </React.Fragment>
    );
  }

  const requests = props.selectedCities.map((city) =>
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city.name}&units=metric&appid=78e1adc1e41d5f49a06956e69d4225ce`
    )
  );
  React.useEffect(() => {
    Promise.all(requests)
      .then((responses) => {
        return responses;
      })
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((forecasts) => {
        const data = [];
        for (var i = 0; i < forecasts.length; i++) {
          if (i === 0) {
            forecasts[i].list.forEach((day) =>
              data.push({
                time: day.dt_txt,
                [forecasts[i].city.name]: day.main.temp,
              })
            );
          } else {
            for (var j = 0; j < forecasts[i].list.length; j++) {
              data[j][forecasts[i].city.name] = forecasts[i].list[j].main.temp;
            }
          }
        }
        setChartData(data);
      });
  }, [props.selectedCities]);

  const series = [];
  chartData[0] &&
    Object.keys(chartData[0])
      .filter((key) => key !== "time")
      .forEach((key) =>
        series.push(
          <LineSeries
            name="Novinskiye"
            valueField="Novinskiye"
            argumentField="time"
          />
        )
      );

  return (
    <Paper>
      <Chart data={chartData} className={classes.chart}>
        {series}
        <ArgumentAxis />
        <ValueAxis />

        <Legend
          position="bottom"
          rootComponent={Root}
          itemComponent={Item}
          labelComponent={Label}
        />
        <Title
          text={`Graphical 5 day/ 3 hour forecast`}
          textComponent={TitleText}
        />
      </Chart>
    </Paper>
  );
}
