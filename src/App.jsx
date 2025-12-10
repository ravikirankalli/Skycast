import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ErrorToast from "./components/ErrorToast";
import AnimatedBackground from "./components/AnimatedBackground";
import { fetchCurrentWeather } from "./services/weather";
import "./App.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bgType, setBgType] = useState("");

  const getWeatherType = (main) => {
    if (!main) return "";

    const w = main.toLowerCase();

    if (w.includes("clear")) return "sunny";
    if (w.includes("rain") || w.includes("drizzle")) return "rain";
    if (w.includes("thunder")) return "thunder";
    if (w.includes("snow")) return "snow";

    return "clouds"; // default
  };

  const handleSearch = async (city) => {
    setError("");
    setWeather(null);

    if (!city) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);

    try {
      const data = await fetchCurrentWeather(city);
      setWeather(data);

      const condition = data.weather?.[0]?.main;
      setBgType(getWeatherType(condition));
    } catch (err) {
      setError(err.message || "Unable to fetch weather.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">

      {/* ⭐ Animated Dynamic Background */}
      <AnimatedBackground type={bgType} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Main Content */}
      <div className="relative z-20 weather-app">
        <div className="weather-container">
          <header className="weather-header">
            <h1 className="title">VibeWeather</h1>
            <p className="subtitle">
              Fast, beautiful weather info —{" "}
              <span className="highlight">search a city</span> to begin
            </p>
          </header>

          <main className="weather-main">
            <SearchBar onSearch={handleSearch} loading={loading} />

            <div className="weather-content">
              {error && (
                <ErrorToast message={error} onClose={() => setError("")} />
              )}

              {loading && (
                <div className="loading-text">Fetching latest weather… ⛅</div>
              )}

              {weather && <WeatherCard data={weather} />}
            </div>
          </main>

          <footer className="weather-footer">
            <p>Data from OpenWeatherMap • Temperatures in Celsius</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
