import React, { useState, useEffect } from "react";
import './weatherapi.css';

function WeatherAPI({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const weatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    const getWeather = async () => {
      try {
        setLoading(true);
        console.log(weatherApiKey);
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${weatherApiKey}&units=metric`;


        // Throw error if API call fails
        const response = await fetch(weatherUrl);
        if (!response.ok) {
          // TODO: See if there is a better error method
          throw new Error(`Error: ${response.status}`)
        }

        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getWeather();
  }, []);


  //TODO: Fix with something appropriate
  if (loading) return <p>Stuff to say while loading...</p>;
  if (error) return <p>Stuff to say if there is an error... {error.message}?</p>;
  if (!weatherData) return <p>Sorry, no weather data currently available</p>;

  const sunrise = new Date(weatherData.sys.sunrise * 1000);
  const sunset = new Date(weatherData.sys.sunset * 1000);

  return (
      <div className="weather-parent">
        <div className="widget-main">
          <h2>{weatherData.main.temp}°C</h2>
          <p className="center">Feels like {weatherData.main.feels_like}°C</p>
          <img className="icon"
               alt="Image"
               src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}/>
          <h3>{weatherData.name}</h3>
          <h4 className="center">{sunrise.toDateString()}</h4>
        </div>

        <div className="widget-bottom">
          <p className="center">Humidity: {weatherData.main.humidity}%</p>
          <p className="center">Wind speed: {weatherData.wind.speed} m/s</p>
          <p className="center">
            Sunrise: {sunrise.toLocaleTimeString()}
            &nbsp;&nbsp;&nbsp;
            Sunset: {sunset.toLocaleTimeString()}
          </p>
        </div>
      </div>

  )
}
export default WeatherAPI;