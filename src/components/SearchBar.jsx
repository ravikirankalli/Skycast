import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import "../App.css";

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 🔍 Fetch city suggestions (GeoDB API)
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const res = await fetch(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}`,
          {
            headers: {
              "X-RapidAPI-Key": "YOUR_API_KEY_HERE",
              "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
            },
          }
        );
        const data = await res.json();
        setSuggestions(data.data || []);
      } catch (err) {
        console.error("Error fetching city suggestions:", err);
      }
    };

    const debounce = setTimeout(fetchCities, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
    setShowDropdown(false);
  };

  const handleSelect = (city) => {
    const fullName = `${city.city}, ${city.country}`;
    setQuery(fullName);
    setShowDropdown(false);
    onSearch(fullName);
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Enter city (e.g., Mumbai, New York)"
        />

        <button type="submit" disabled={loading}>
          <MagnifyingGlassIcon className="icon" />
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* 🌆 Dropdown */}
      {showDropdown && suggestions.length > 0 && (
        <ul className="suggestion-dropdown">
          {suggestions.map((city) => (
            <li
              key={city.id}
              className="suggestion-item"
              onClick={() => handleSelect(city)}
            >
              {city.city}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
