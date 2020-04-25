import React from "react";
import NavBar from "./components/NavBar";
import OverView from "./components/Overview";
import DailyForecast from "./pages/DailyForecast";
import "./App.css";

function App() {
  const [overviewState, setOverViewState] = React.useState(false);
  const [selectedCities, setSelectedCities] = React.useState([]);

  const handleDrawerToggle = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOverViewState(open);
  };

  const handleAddSelectedCities = (city) => {
    city.selected = true;
    const cities = selectedCities.concat(city);
    setSelectedCities(cities);
  };

  const handleRemoveSelectedCities = (city) => {
    city.selected = false;
    const cities = selectedCities.filter(
      (selected) => selected.name !== city.name
    );
    setSelectedCities(cities);
  };

  return (
    <React.Fragment>
      <NavBar onOverviewOpen={handleDrawerToggle(true)} />
      <OverView
        onOverviewClose={handleDrawerToggle(false)}
        onOverviewOpen={handleDrawerToggle(true)}
        open={overviewState}
        onSelectedCityAdd={handleAddSelectedCities}
        onSelectedCityRemove={handleRemoveSelectedCities}
        selectedCities={selectedCities}
      />
      <DailyForecast />
    </React.Fragment>
  );
}

export default App;
