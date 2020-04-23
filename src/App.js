import React from "react";
import NavBar from "./components/NavBar";
import OverView from "./components/Overview";
import "./App.css";

function App() {
  const [overviewState, setOverViewState] = React.useState(false);

  const [weatherMain, setWeatherMain] = React.useState("");
  const [weatherDescription, setWeatherDescription] = React.useState("");
  const [weatherIcon, setWeatherIcon] = React.useState("01d");
  const [weatherTemp, setWeatherTemp] = React.useState("");
  const [weatherHumidity, setWeatherHumidity] = React.useState("");
  const [weatherWind, setWeatherWind] = React.useState("");

  React.useEffect(() => {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=Novi%20Sad&appid=78e1adc1e41d5f49a06956e69d4225ce"
    )
      .then((res) => res.json())
      .then((json) => {
        setWeatherMain(json.weather[0].main);
        setWeatherDescription(json.weather[0].description);
        setWeatherIcon(json.weather[0].icon);
        setWeatherTemp(json.main.temp);
        setWeatherHumidity(json.main.humidity);
        setWeatherWind(json.wind.speed);
      });
  }, []);

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

  return (
    <React.Fragment>
      <NavBar onOverviewOpen={handleDrawerToggle(true)} />
      <OverView
        onOverviewClose={handleDrawerToggle(false)}
        onOverviewOpen={handleDrawerToggle(true)}
        open={overviewState}
        weatherMain={weatherMain}
        weatherDescription={weatherDescription}
        weatherIcon={weatherIcon}
        weatherTemp={weatherTemp}
        weatherHumidity={weatherHumidity}
        weatherWind={weatherWind}
      />
    </React.Fragment>
  );
}

export default App;
