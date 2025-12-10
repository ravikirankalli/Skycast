import React from "react";
import { motion } from "framer-motion";

export default function WeatherCard({ data }) {
  const w = data?.weather?.[0] || {};
  const iconUrl = w.icon
    ? `https://openweathermap.org/img/wn/${w.icon}@4x.png`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        p-8 rounded-3xl text-white
        bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700
        shadow-2xl
        backdrop-blur-xl
      "
      style={{
        border: "none",
        outline: "none",
      }}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">{data.name}, {data.sys?.country}</h1>
          <p className="text-white/90 capitalize mt-1 text-lg">{w.description}</p>
        </div>

        {/* Icon + Temp */}
        <div className="flex items-center gap-4">
          {iconUrl && (
            <motion.img
              src={iconUrl}
              alt={w.description}
              className="w-24 h-24 drop-shadow-xl"
              whileHover={{ scale: 1.1 }}
            />
          )}

          <div className="text-right">
            <h2 className="text-6xl font-semibold text-white">
              {Math.round(data.main.temp)}°C
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Feels like {Math.round(data.main.feels_like)}°
            </p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/20 my-6" />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { label: "Humidity", value: `${data.main.humidity}%` },
          { label: "Wind", value: `${Math.round(data.wind?.speed)} m/s` },
          { label: "Condition", value: data.weather?.[0]?.main },
        ].map((item, index) => (
          <div
            key={index}
            className="
              p-5 rounded-2xl text-center
              bg-white/10 backdrop-blur-lg
              shadow-lg
            "
          >
            <p className="text-2xl font-bold text-white">{item.value}</p>
            <p className="text-white/80 text-sm mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
