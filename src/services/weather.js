const BASE = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_OWM_API_KEY;

async function fetchCurrentWeather(city) {
  if (!API_KEY) {
    throw new Error("API key not found. Set VITE_OWM_API_KEY in .env");
  }

  const url = `${BASE}?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    // parse JSON error when possible
    let errText = `Unable to find weather for "${city}"`;
    try {
      const json = await res.json();
      if (json?.message) {
        errText = json.message;
      }
    } catch {}
    throw new Error(errText);
  }
  const data = await res.json();
  return data;
}

export { fetchCurrentWeather };
