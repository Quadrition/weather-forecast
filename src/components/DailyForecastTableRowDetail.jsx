import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useTheme } from "@material-ui/core/";
import Container from "@material-ui/core/Container";
import { PagingState, IntegratedPaging } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";

export default function DailyForecastTableRowDetail(props) {
  const columns = [
    { name: "time", title: "time" },
    { name: "temp", title: "temp" },
    { name: "tempLow", title: "temp low" },
    { name: "tempHigh", title: "temp high" },
    { name: "pressure", title: "pressure" },
    { name: "visibility", title: "visibility" },
    { name: "humidity", title: "humidity" },
  ];
  const themes = useTheme();

  const [rows, setRows] = React.useState([]);

  const [tableColumnExtensions] = useState([
    { columnName: "time", width: "auto" },
    { columnName: "temp", width: "auto" },
    { columnName: "tempLow", width: "auto" },
    { columnName: "tempHigh", width: "auto" },
    { columnName: "pressure", width: "auto" },
    { columnName: "visibility", width: "auto" },
    { columnName: "humidity", width: "auto" },
  ]);

  React.useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/forecast/?q=${props.row.city}&units=metric&appid=78e1adc1e41d5f49a06956e69d4225ce`
    )
      .then((response) => response.json())
      .then((weather) => {
        const data = [];
        weather.list.forEach((time) => {
          data.push({
            time: time.dt_txt.substring(5, time.dt_txt.length - 3),
            temp: time.main.temp,
            tempLow: time.main.temp_min,
            tempHigh: time.main.temp_max,
            pressure: time.main.pressure,
            visibility: time.visibility,
            humidity: time.main.humidity,
          });
        });

        setRows(data);
      });
  }, []);

  return (
    <Container maxWidth="md" style={{ padding: themes.spacing(0, 2) }}>
      <Grid rows={rows} columns={columns}>
        <PagingState defaultCurrentPage={0} pageSize={10} />
        <IntegratedPaging />
        <Table columnExtensions={tableColumnExtensions} />
        <TableHeaderRow />
        <PagingPanel />
      </Grid>
    </Container>
  );
}
