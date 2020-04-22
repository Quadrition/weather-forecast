import React from "react";
import NavBar from "./components/NavBar";
import OverView from "./components/Overview";
import "./App.css";

function App() {
  const [overviewState, setOverViewState] = React.useState(false);

  const handleDrawerToggle = (open) => (event) => {
    if (
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
        open={overviewState}
      />
    </React.Fragment>
  );
}

export default App;
