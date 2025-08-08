import React, { useState } from "react";
import Searchbar from "./Component/Searchbar";
import axios from "axios";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = "https://openweathermap.org/data/2.5/weather";

  const fetchWeather = async (city) => {
    setLoading(true);
    setError("");
    try {
      const url = `$(API_URL)?q=${city}$units=metric&appid=$(API_KEY)`;
      const response = await axios.get(url);
      console.log(response.data);
      setWeather(response.data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("city not found. pls try again.");
      } else {
        setError("an error occured. pls try again later.");
      }
      setWeather(null);
    }
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-blue-100">
      <div className="bg-black/90 text-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1
          className="text-3
       text-center font-bold  mb-6"
        >
          Weather app
        </h1>
        <Searchbar fetchWeather={fetchWeather} />
      </div>
    </div>
  );
};

export default App;
