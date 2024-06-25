import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weatherApp.css';

const API_KEY = '9d700c0c0c25726a887c42a0c667c9dd';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeatherByGeolocation();
  }, []);

  const fetchWeatherByGeolocation = async () => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
        setError(null);
      });
    } catch (error) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
  };

  const handleLocationSubmit = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('Failed to fetch weather data');
      setWeatherData(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLocationSubmit();
    }
  };

  return (
    <div className="container">
      <h1 className="title">Weather App</h1>
      <div className="inputContainer">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="input"
          onKeyPress={handleKeyPress}
        />
        <button className="button" onClick={handleLocationSubmit}>
          Search
        </button>
      </div>

      {error ? <p className="error">{error}</p> : null}

      {weatherData && (
        <div className="weatherContainer">
          <h2 className="subtitle">{weatherData.name}</h2>
          <p className="temperature">Temperature: {weatherData.main.temp}°C</p>
          <p className="humidity">Humidity: {weatherData.main.humidity}%</p>
          <p className="windSpeed">Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
