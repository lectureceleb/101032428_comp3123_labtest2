import React, { useState, useEffect } from "react";
import App from "./App";

function WeatherAPI({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        setLoading(true);
        const weatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
        console.log(weatherApiKey);
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Toronto&appid=${weatherApiKey}`;

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

  return (
      <div>
        <h2>Toronto's Weather</h2>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Feels like: {weatherData.main.feels_like}°C</p>
        <p>Humidity: {weatherData.main.humidity}</p>
        <p>Wind speed: {weatherData.wind.speed}m/s</p>
        <p>Sunrise: {weatherData.sys.sunrise}</p>
        <p>Sunset: {weatherData.sys.sunset}</p>
      </div>
  )
}
export default WeatherAPI;