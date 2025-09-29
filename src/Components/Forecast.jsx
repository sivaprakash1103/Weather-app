import React from "react";

const Forecast = ({ forecastweather, location }) => {
  if (!forecastweather || !location) return null;

  return (
    <div className="container mt-5">
      <h2 className="text-white text-center fw-bold mb-4">
        Weather Forecast for {location.name}
      </h2>

      <div className="accordion" id="forecastAccordion">
        {forecastweather.forecastday.map((dayData, index) => {
          const collapseId = `collapse-${index}`;
          const headingId = `heading-${index}`;

          return (
            <div className="accordion-item mb-3" key={index}>
              <h2 className="accordion-header" id={headingId}>
                <button
                  className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${collapseId}`}
                  aria-expanded={index === 0 ? "true" : "false"}
                  aria-controls={collapseId}
                >
                  <div className="container-fluid">
                    <div className="row align-items-center w-100">
                      <div className="col-3 fw-semibold">{dayData.date}</div>
                      <div className="col-2">
                        <img src={dayData.day.condition.icon} alt="condition" />
                      </div>
                      <div className="col-4">{dayData.day.condition.text}</div>
                      <div className="col-3 text-end">
                        <strong>Max:</strong> {dayData.day.maxtemp_c}°C
                      </div>
                    </div>
                  </div>
                </button>
              </h2>
              <div
                id={collapseId}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                aria-labelledby={headingId}
                data-bs-parent="#forecastAccordion"
              >
                <div className="accordion-body">
                  <div className="row g-3">
                    {dayData.hour.map((hourData, idx) => (
                      <div className="col-md-6" key={idx}>
                        <div className="bg-light rounded p-3 shadow-sm">
                          <div className="d-flex justify-content-between mb-2">
                            <div>{hourData.time}</div>
                            <div>{hourData.temp_c}°C</div>
                          </div>
                          <div className="progress" style={{ height: "8px" }}>
                            <div
                              className="progress-bar bg-primary"
                              role="progressbar"
                              style={{ width: `${hourData.temp_c}%` }}
                              aria-valuenow={hourData.temp_c}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;