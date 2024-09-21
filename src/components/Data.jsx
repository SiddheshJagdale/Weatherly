import React, { useState, useEffect } from "react";
import axios from "axios";
import { useBackgroundStore, useWeatherStore } from "../libs/zustand/store.js";
import Input from "./Input.jsx";
import Icon from "./Icon.jsx";
import gsap from "gsap";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { debounce } from "lodash";
import { useGSAP } from "@gsap/react";

const Data = () => {
  const setTemperature = useWeatherStore((state) => state.setTemperature); // Zustand state setter

  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState("");
  const [temp, setTemp] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [inputValue, setInputValue] = useState(""); // Store the user input
  const [cache, setCache] = useState({});
  const apiKey = import.meta.env.VITE_API_KEY;
  const setBackground = useBackgroundStore((state) => state.setBackground);

  useGSAP(() => {
    gsap.to("#icon", {
      y: -5,
      y: +5, // Move 5px up
      duration: 1.5, // Duration of one complete animation
      ease: "power1.inOut", // Easing function for smoothness
      repeat: -1, // Infinite loop
      yoyo: true, // Reverse the animation to create up and down effect
    });
  });

  const handleInputChange = debounce((newValue) => {
    setInputValue(newValue);
  }, 500); // 500ms debounce delay

  const fetchWeatherData = async (lat, lon) => {
    const cacheKey = `${lat}-${lon}`;

    if (cache[cacheKey]) {
      console.log("Using cached data");
      const cachedData = cache[cacheKey];
      updateWeatherData(cachedData);
    } else {
      try {
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const response = await axios.get(weatherApiUrl);

        setCache((prevCache) => ({
          ...prevCache,
          [cacheKey]: response.data,
        }));

        updateWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  const handleClick = async () => {
    try {
      const geocodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${apiKey}`;
      const geocodeResponse = await axios.get(geocodingApiUrl);

      if (geocodeResponse.data.length > 0) {
        const lat = geocodeResponse.data[0].lat;
        const lon = geocodeResponse.data[0].lon;

        setLatitude(lat);
        setLongitude(lon);
        fetchWeatherData(lat, lon); // Fetch the weather data for the input location
      } else {
        console.log("Location not found");
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };

  // Automatically fetch weather data after getting the user's location
  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherData(latitude, longitude); // Fetch weather data when location is set
    }
  }, [latitude, longitude]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    }
  }, []);

  const updateWeatherData = (data) => {
    setPlace(data.name);
    setWeather(data.weather[0].main);
    setTemp(Math.round(data.main.temp));
    setTemperature(Math.round(data.main.temp)); // Zustand store update
    setWindSpeed(Math.round(data.wind.speed * 3.6)); // Convert m/s to km/h
    setVisibility(data.visibility / 1000); // Convert meters to kilometers
    setHumidity(data.main.humidity);
    setBackground(data.weather[0].main);
  };

  return (
    <div className="flex flex-col items-center p-4 h-full w-full md:w-[40%] gap-4 backdrop-blur-sm">
      {/* Weather */}
      <div className="flex flex-row gap-4 items-center h-[20%]">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl">{weather}</h2>
        <div className="text-4xl sm:text-4xl lg:text-6xl" id="icon">
          <Icon weather={weather} />
        </div>
      </div>

      {/* Input Field (Optional Search for different location) */}
      <div className="flex flex-row w-full gap-2 justify-center">
        <Input onInputChange={handleInputChange} />
        <button
          onClick={handleClick}
          className="px-3 border-black border-[1px] rounded-full hover:bg-neutral-200 transition-all"
        >
          <HiMiniMagnifyingGlass size={18} />
        </button>
      </div>

      {/* Display the input value */}
      <div className="text-lg sm:text-2xl lg:text-3xl">{place}</div>

      {/* Specifics */}
      <div className="flex flex-col items-center px-5 h-[60%] w-full  text-lg sm:text-2xl lg:text-2xl">
        <div className="flex flex-row w-3/4 justify-between border-b-[1px] border-neutral-600 py-3">
          <p>Temperature</p>
          <span>{temp !== null ? `${temp}°C` : "N/A"}</span>
        </div>
        <div className="flex flex-row w-3/4 justify-between border-b-[1px] border-neutral-600 py-3">
          <p>Humidity</p>
          <span>{humidity !== null ? `${humidity}%` : "N/A"}</span>
        </div>
        <div className="flex flex-row w-3/4 justify-between border-b-[1px] border-neutral-600 py-3 ">
          <p>Visibility</p>
          <span>{visibility !== null ? `${visibility}km` : "N/A"}</span>
        </div>
        <div className="flex flex-row w-3/4 justify-between border-b-[1px] border-neutral-600 py-3">
          <p>Wind Speed</p>
          <span>{windSpeed !== null ? `${windSpeed}km/hr` : "N/A"}</span>
        </div>
      </div>
    </div>
  );
};

export default Data;
