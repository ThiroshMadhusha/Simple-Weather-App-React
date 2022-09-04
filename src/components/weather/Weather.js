import React, { useState } from "react";
import "./Weather.scss";

const Weather = () => {
  // Create Date

  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // End Date
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // API Links
  const api = {
    url: "http://api.openweathermap.org/data/2.5/",
    key: "6df767bfb65ad3f07d72bafdb5773f6c",
  };

  // Add Weather Images
  const iconURL = "http://openweathermap.org/img/w/";

  const getInput = (e) => {
    setInput(e.target.value);
  };

  const getWeatherData = (e) => {
    if (e.key === "Enter" && input === "") {
      setErrorMsg("Inputs Cannot Be Empty Value");
      setError(true);
    }

    if (e.key === "Enter" && input !== "") {
      setIsLoading(true);
      setError(true);
      fetch(`${api.url}weather?q=${input}&units=metric&APPID=${api.key}`)
        .then((res) => {
          if (!res.ok) {
            throw Error("Search Fail..!");
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setWeather(data);
          setInput("");
          setError(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setError(true);
          setErrorMsg(err.message);
          setIsLoading(false);
        });
    }
  };

  // Add Date UseState
  const [dateToday, setDateToday] = useState(date);

  return (
    <section className="--100vh --center-all">
      <div className="container weather --flex-center">
        <div className="weather-app --text-light">
          <h1 className="header">Live Weather</h1>
          <p className="date">{dateToday}</p>
          <div className="--form-control --my">
            <input
              type="text"
              placeholder="Search City Name"
              onChange={getInput}
              value={input}
              onKeyPress={getWeatherData}
            />
          </div>
          {error ? (
            <p className={errorMsg != "" ? "error" : ""}>{errorMsg}</p>
          ) : (
            <div className="result --card --my2">
              <h2>
                {weather.name},{weather.sys.country}
              </h2>
              <div className="icon">
                <img
                  src={iconURL + weather.weather[0].icon + ".png"}
                  alt={weather.weather[0].main}
                />
              </div>
              <p>Temp : {Math.round(weather.main.temp)}°C</p>
              <p>Weather : {weather.weather[0].main}</p>
              <p>
                Temp Range : {Math.round(weather.main.temp_max)}°C /
                {Math.round(weather.main.temp)}°C
              </p>
            </div>
          )}

          {isLoading && <h3>Loading ...</h3>}
        </div>
      </div>
    </section>
  );
};

export default Weather;
