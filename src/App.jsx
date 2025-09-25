import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Current from "./Components/Current";
import Forecast from "./Components/Forecast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [city, SetCity] = useState("");
  const [clickedcity, SetClickedCity] = useState("");
  const [citySuggestions, SetCitySuggestions] = useState([]);
  const [currentweather, SetCurrent] = useState();
  const [forecastweather, SetForecast] = useState();
  const [location, SetLocation] = useState();
  const [loading, SetLoading] = useState(false);
  const [unit, SetUnit] = useState("C"); // Temperature unit toggle state

  const autocompUrl =
    "https://api.weatherapi.com/v1/search.json?key=83c0b17cb2774eac95723527231501&q=";

  const weatherURL = (city) =>
    `https://api.weatherapi.com/v1/forecast.json?key=83c0b17cb2774eac95723527231501&q=${city}&days=7&aqi=no&alerts=yes`;

  const fetchAutoCompUrl = async () => {
    try {
      const response = await axios.get(autocompUrl + city);
      const resp = response.data;
      const cityData = resp.map((data) => {
        return `${data.name}, ${data.region}, ${data.country}`;
      });
      SetCitySuggestions(cityData);
    } catch (e) {
      console.log("Error fetching autocomplete data", e);
    }
  };

  const handleSelectedcity = (city) => {
    SetClickedCity(city);
    fetchweatherAPI(city);
  };

  const fetchweatherAPI = async (city) => {
    SetLoading(true); // Start spinner
    try {
      const response = await axios.get(weatherURL(city));
      const resp = response.data;
      SetCurrent(resp.current);
      SetForecast(resp.forecast);
      SetLocation(resp.location);
      SetLoading(false); // Stop spinner
    } catch (e) {
      console.log("Weather API error", e);
      SetLoading(false); // Stop spinner
    }
  };

  useEffect(() => {
    if (city && city.length > 3) {
      fetchAutoCompUrl();
    }
  }, [city]);

  return (
    <>
      {/* Header Section */}
      <header className="text-center py-4 bg-dark text-white shadow-lg">
        <h1 className="fw-bold">🌤 Weather App</h1>
        <p className="text-muted">Check current and forecasted weather worldwide</p>
      </header>

      {/* Main Container */}
      <div
        className="container my-5 p-4 rounded"
        style={{
          background: "linear-gradient(to bottom right, #4e73df, #f5f5f5)",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="🌍 Enter City"
            className="form-control p-3 fs-5 rounded-4 shadow-sm"
            onChange={(e) => {
              SetCity(e.target.value);
              if (e.target.value === "") {
                SetCurrent(null);
                SetForecast(null);
                SetLocation(null);
                SetClickedCity(null);
              }
            }}
            style={{
              border: "2px solid #4e73df",
              color: "#333",
            }}
          />
        </div>

        {/* City Suggestions */}
        {citySuggestions &&
          citySuggestions.map((city, index) => (
            <div
              key={index}
              className="text-center text-dark bg-light border rounded shadow-sm py-2 my-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectedcity(city)}
            >
              {city}
            </div>
          ))}

        {/* Loader Spinner */}
        {loading && (
          <div className="text-center py-3">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}

        {/* Current Weather Component */}
        {currentweather && (
          <Current
            currentweather={currentweather}
            location={location}
            unit={unit} // Pass unit to Current
          />
        )}

        {/* Forecast Weather Component */}
        {forecastweather && (
          <Forecast
            forecastweather={forecastweather}
            location={location}
            unit={unit} // Pass unit to Forecast
          />
        )}

        {/* Unit Toggle */}
        <div className="text-center mt-4">
          <button
            className={`btn btn-${unit === "C" ? "primary" : "secondary"} me-2`}
            onClick={() => SetUnit("C")}
          >
            Celsius
          </button>
          <button
            className={`btn btn-${unit === "F" ? "primary" : "secondary"}`}
            onClick={() => SetUnit("F")}
          >
            Fahrenheit
          </button>
        </div>
      </div>
    </>
  );
}

export default App;