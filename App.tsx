import * as React from 'react';
import { useState, useEffect } from 'react';

export default function App() {
  const [zipcode, setZipcode] = useState('');
  const [weather, setWeather] = useState();

  function handleChange(event) {
    setZipcode(event.target.value);
    console.log('Your zip code is' + zipcode);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=052f26926ae9784c2d677ca7bc5dec98`
    );
    let toJson = await response.json();
    await setWeather(toJson);
    setZipcode('');
    console.log(toJson, weather);
  }
  const convert = (kelvin) => {
    return (((kelvin - 273.15) * 9) / 5 + 32).toFixed(1);
  };

  return (
    <div>
      {console.log('line 29', weather)}
      <p>City: {weather ? weather.name : ''}</p>
      <p>Description: {weather ? weather.weather[0].description : ''}</p>
      <p>High Temp: {weather ? convert(weather.main.temp_max) : ''}</p>
      <p>Low Temp: {weather ? convert(weather.main.temp_min) : ''}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Please enter your zip code for the weather:
          <input type="text" value={zipcode} onChange={handleChange} />
        </label>
        <input type="submit" value="Get my forecast!" />
      </form>
    </div>
  );
}
