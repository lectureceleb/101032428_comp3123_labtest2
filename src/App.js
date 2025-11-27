import React, { useState } from "react";
import WeatherAPI from "./WeatherAPI";

import logo from './logo.svg';
import './App.css';

function App() {
  const [currentCity, setCurrentCity] = useState("Toronto");

  const handleCityChange = (event) => {
    setCurrentCity(event.target.value);
  }
  return (
      <div>
        <h1>Omar's Weather App</h1>
        <WeatherAPI />
      </div>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
