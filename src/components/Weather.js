import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function normalizeCountry(input) {
  if (!input) return "IN"; // default India

  const countries = {
    india: "IN",
    unitedstates: "US",
    usa: "US",
    england: "GB",
    uk: "GB",
    canada: "CA",
    australia: "AU",
    // add more as needed
  };

  let key = input.trim().toLowerCase().replace(/\s+/g, "");
  return countries[key] || input.toUpperCase();
}

function Weather() {
  const [weather, setWeather] = useState({});
  const [form, setForm] = useState({
    city: "",
    country: "",
  });

  //actual API key from https://openweathermap.org/api
  const APIKEY = process.env.REACT_APP_WEATHER_API_KEY;


  async function weatherData(e) {
  e.preventDefault();

  if (!form.city) {
    alert("Please enter a city");
    return;
  }

  // normalize country input
  let countryCode = normalizeCountry(form.country);

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${countryCode}&appid=${APIKEY}&units=metric`
    );
    const data = await res.json();

    if (data.cod !== 200) {
      alert(data.message || "City not found!");
      return;
    }

    setWeather({ data });
  } catch (err) {
    alert("Error fetching weather data. Try again later.");
    console.error(err);
  }
}


  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setForm({ ...form, [name]: value });
  };

  return (
    <div className="weather">
      <span className="title">Weather App</span>
      <br />
      <form>
        <input
          type="text"
          placeholder="City"
          name="city"
          onChange={handleChange}
        />
        &nbsp;&nbsp;&nbsp;
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={handleChange}
        />
        <button className="getweather" onClick={weatherData}>
          Submit
        </button>
      </form>

      {weather.data ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
