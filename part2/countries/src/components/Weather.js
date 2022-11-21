import { useState, useEffect } from "react";
import axios from 'axios';
const api_key = process.env.REACT_APP_API_KEY

const Weather = ({ country }) => {

    const [ weather, setWeather ] = useState(0);
    
    useEffect(() => {
        axios
        .get("https://api.openweathermap.org/data/2.5/weather?lat=" + country.latlng[0] + "&lon=" + country.latlng[1] + "&appid=" + api_key)
        .then((response) => {
          setWeather(response.data);
        });
    }, [country]);

      return (
        <>
          {weather ? (
            <>
              <h2>Weather in {country.capital}</h2>
              <p>temperature {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
              <img src={"http://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png"} alt="weather icon" width="50"/>
              {<p>wind {weather.wind.speed} m/s</p>}
            </>
          ) : null}
        </>
      );

};

export default Weather;