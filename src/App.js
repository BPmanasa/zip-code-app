import React, { useState } from "react";
import "./App.css";
import ZipCodeForm from "./components/zipCodeForm";
import LocationInfo from "./components/LocationInfo";

function App() {
  const [location, setLocation] = useState(null);

  return (
    <div className="App">
      <h1>Zip Code Information App</h1>
      <ZipCodeForm setLocation={setLocation} />
      <LocationInfo location={location} />
    </div>
  );
}

export default App;
