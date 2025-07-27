import { useState } from "react";
import './App.css';
import type { WeatherData } from "./types/weather";

const API_KEY = "63b4c71723be8157de0bddf9a72de4f4";

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState< WeatherData | null>(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      setError('');
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if(!res.ok) {
        throw new Error('City not found')
      }
      const data: WeatherData = await res.json();
      setWeather(data);
    } catch (error: any) {
      setWeather(null);
      setError(error.message || 'Something went wrong');
    }
}

return (
  <div className="App" style = {{padding: '2rem'}}>
    <h1>Weather App</h1>
    <input type="text" placeholder = "Enter city" value={city} onChange={(e) => setCity(e.target.value)} style={{padding: '0.5rem', fontSize: '16px'}} />
    <button onClick = {fetchWeather} style={{marginLeft: '1rem'}}>
      Get Weather
    </button>

    {error && <p style={{color: "red"}}>{error}</p>}

    {weather && (
      <div style={{marginTop: '2em'}}>
        <h2>{weather.name}</h2>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Condition: {weather.weather[0].description}</p>
        <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
      </div>
    )}
  </div>
)
}

export default App;