import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import {
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  SearchState,
  RowDetailState,
  IntegratedFiltering,
} from "@devexpress/dx-react-grid";
import RowDetail from "./DailyForecastTableRowDetail";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableRowDetail,
  Toolbar,
  SearchPanel,
} from "@devexpress/dx-react-grid-material-ui";

export default function DailyForecastTable(props) {
  const columns = [
    { name: "city", title: "City" },
    { name: "temp", title: "Temperature" },
    { name: "tempLow", title: "Temp low" },
    { name: "tempHigh", title: "Temp high" },
    { name: "pressure", title: "Pressure" },
    { name: "visibility", title: "Visibility" },
    { name: "humidity", title: "Humidity" },
  ];

  const [rows, setRows] = React.useState([]);

  const requests = props.selectedCities.map((city) =>
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=78e1adc1e41d5f49a06956e69d4225ce`
    )
  );

  React.useEffect(() => {
    Promise.all(requests)
      .then((responses) => {
        return responses;
      })
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((weathers) => {
        const data = [];
        weathers.forEach((weather) => {
          data.push({
            city: weather.name,
            temp: weather.main.temp,
            tempLow: weather.main.temp_min,
            tempHigh: weather.main.temp_max,
            pressure: weather.main.pressure,
            visibility: weather.visibility,
            humidity: weather.main.humidity,
          });
        });
        setRows(data);
      });
  }, [props.selectedCities]);

  const [pageSizes] = useState([5, 10, 15, 0]);

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <SearchState />
        <RowDetailState />
        <SortingState />
        <IntegratedSorting />
        <PagingState defaultCurrentPage={0} defaultPageSize={5} />
        <IntegratedPaging />
        <Table />
        <TableHeaderRow showSortingControls />
        <TableRowDetail contentComponent={RowDetail} />
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
    </Paper>
  );
}
