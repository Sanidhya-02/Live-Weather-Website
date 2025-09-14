import React from "react";
import "./displayweather.css";

function DisplayWeather({ data }) {
  if (!data || data.cod === "404") {
    return (
      <div className="maincard">
        <h2>{data?.message || "No data available"}</h2>
      </div>
    );
  }

  const iconurl =
    "http://openweathermap.org/img/wn/" +
    (data.weather && data.weather[0]?.icon) +
    ".png";

  return (
    <div className="displayweather">
      <div className="maincard">
        <span className="cardtitle">
          {data.name}, {data.sys?.country}. Weather
        </span>
        <span className="cardsubtitle">
          As of {new Date().toLocaleTimeString()}
        </span>

        <h1>
          {Math.floor(data.main?.temp)}
          <sup>°</sup>
        </h1>
        <span className="weather-main">{data.weather?.[0]?.main}</span>
        <img className="weather-icon" src={iconurl} alt="weather-icon" />
        <span className="weather-description">
          {data.weather?.[0]?.description}
        </span>
      </div>

      <div className="weatherdetails">
        <div className="section1">
          <table>
            <tbody>
              <tr>
                <td><h4>High/Low</h4></td>
                <td>
                  <span>
                    {Math.floor(data.main?.temp_max)} /
                    {Math.floor(data.main?.temp_min - 11)}
                  </span>
                </td>
              </tr>
              <tr>
                <td><h4>Humidity</h4></td>
                <td><span>{data.main?.humidity} %</span></td>
              </tr>
              <tr>
                <td><h4>Pressure</h4></td>
                <td><span>{data.main?.pressure} hPa</span></td>
              </tr>
              <tr>
                <td><h4>Visibility</h4></td>
                <td><span>{(data.visibility / 1000).toFixed(1)} km</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="section2">
          <table>
            <tbody>
              <tr>
                <td><h4>Wind</h4></td>
                <td>
                  <span>
                    {Math.floor(((data.wind?.speed || 0) * 18) / 5)} km/hr
                  </span>
                </td>
              </tr>
              <tr>
                <td><h4>Wind Direction</h4></td>
                <td>
                  <span>
                    {data.wind?.deg}
                    <sup>°</sup>
                  </span>
                </td>
              </tr>
              <tr>
                <td><h4>Sunrise</h4></td>
                <td>
                  <span>
                    {new Date(data.sys?.sunrise * 1000).toLocaleTimeString()}
                  </span>
                </td>
              </tr>
              <tr>
                <td><h4>Sunset</h4></td>
                <td>
                  <span>
                    {new Date(data.sys?.sunset * 1000).toLocaleTimeString()}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DisplayWeather;
