import React from "react";

const Current = ({ currentweather, location }) => {
  if (!currentweather || !location) return null;

  return (
    <div
      className="container-fluid py-5"
      style={{
        background: "linear-gradient(to bottom, #1e3c72, #2a5298, #e0eafc)",
        color: "#fff",
      }}
    >
      <h2 className="text-center fw-bold mb-5">
        🌤 Current Weather in {location?.name}
      </h2>

      <div className="row g-4 justify-content-center px-3">
        {/* Weather Condition */}
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
          <div
            className="card shadow-lg rounded-4 p-4 text-center border-0"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(5px)",
              borderRadius: "20px",
            }}
          >
            <img
              src={currentweather?.condition?.icon}
              alt="Weather Icon"
              className="mx-auto mb-3"
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                border: "5px solid #4e73df",
              }}
            />
            <h5 className="text-dark text-break fw-semibold">
              {currentweather?.condition?.text}
            </h5>
          </div>
        </div>

        {/* Temperature in Celsius */}
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
          <div
            className="card shadow-lg rounded-4 p-4 text-center border-0 h-100"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(5px)",
              borderRadius: "20px",
            }}
          >
            <p className="text-muted mb-2">Temperature (°C)</p>
            <h3 className="text-primary fw-bold">
              {currentweather?.temp_c}°C
            </h3>
          </div>
        </div>

        {/* Temperature in Fahrenheit */}
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
          <div
            className="card shadow-lg rounded-4 p-4 text-center border-0 h-100"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(5px)",
              borderRadius: "20px",
            }}
          >
            <p className="text-muted mb-2">Temperature (°F)</p>
            <h3 className="text-primary fw-bold">
              {currentweather?.temp_f}°F
            </h3>
          </div>
        </div>

        {/* Humidity */}
        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
          <div
            className="card shadow-lg rounded-4 p-4 text-center border-0 h-100"
            style={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(5px)",
              borderRadius: "20px",
            }}
          >
            <p className="text-muted mb-2">Humidity</p>
            <h3 className="text-primary fw-bold">
              {currentweather?.humidity}%
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Current;