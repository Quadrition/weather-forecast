import React from "react";
import CanvasJSReact from "../canvasjs/canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default function Chart(props) {
  const [chartData, setChartData] = React.useState([]);

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
        for (var i = 0; i < forecasts.length; i++) {
          data.push({
            type: "spline",
            name: forecasts[i].city.name,
            showInLegend: true,
            dataPoints: [],
          });

          for (var j = 0; j < forecasts[i].list.length; j++) {
            data[i]["dataPoints"].push({
              y: forecasts[i].list[j].main.temp,
              label: forecasts[i].list[j].dt_txt,
            });
          }
        }
        console.log("sad");
        setChartData(data);
      });
  }, [props.selectedCities]);

  const options = {
    animationEnabled: true,
    title: {
      text: "Graphic daily 3 hour weather forecast",
    },
    axisY: {
      title: "Time",
      includeZero: false,
    },
    toolTip: {
      shared: true,
    },
    data: chartData,
  };

  return (
    <div>
      <CanvasJSChart
        options={options}
        /* onRef={ref => this.chart = ref} */
      />
      {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  );
}
