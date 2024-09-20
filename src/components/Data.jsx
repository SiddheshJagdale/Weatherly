import React, { useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Input from "./Input.jsx";
import axios from "axios";
import { useWeatherStore } from "../libs/zustand/store.js";

const Data = () => {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };
  const setTemperature = useWeatherStore((state) => state.setTemperature); // Zustand state setter

  const [place, setPlace] = useState("Delhi");
  const [weather, setWeather] = useState("Sunny");
  const [temp, setTemp] = useState("24");
  const [windSpeed, setWindSpeed] = useState("6");
  const [visibility, setVisibility] = useState("");
  const [humidity, setHumidity] = useState("56");

  useGSAP(() => {
    gsap.to("#icon", {
      rotation: 360,
      duration: 5,
      delay: 1,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  const apiKey = import.meta.env.VITE_API_KEY;
  // console.log(apiKey);

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=19.199961&lon=-155.477234&units=metric&appid=${apiKey}`;

  const handleClick = async () => {
    const response = await axios.get(apiUrl);
    setPlace(response.data.name);
    setWeather(response.data.weather[0].main);
    setTemp(Math.round(response.data.main.temp));
    setTemperature(Math.round(response.data.main.temp));
    setWindSpeed(Math.round(response.data.wind.speed * 3.6));
    setVisibility(response.data.visibility / 1000);
    setHumidity(response.data.main.humidity);
  };

  return (
    <div className="flex flex-col items-center p-4 h-full w-full md:w-[40%] gap-4 backdrop-blur">
      {/* Weather */}
      <div className="flex flex-row gap-4 items-center h-[20%]">
        <h2 className=" text-4xl ">{weather}</h2>
        <div className="text-6xl" id="icon">
          <IoSunnyOutline />
        </div>
      </div>

      {/* Input Field */}
      <Input onInputChange={handleInputChange} />
      <button onClick={handleClick}>Submit</button>

      {/* Display the input value */}
      <div className="text-2xl">{place}</div>

      {/* Specifics */}
      <div className="flex flex-col items-center px-5 h-[60%] w-full gap-5 text-2xl">
        <div className="flex flex-row w-3/4 justify-between">
          <p>Temperature</p>
          <span>{temp}°C</span>
        </div>
        <div className="flex flex-row w-3/4 justify-between">
          <p>Humidity</p>
          <span>{humidity} g.m-3</span>
        </div>
        <div className="flex flex-row w-3/4 justify-between">
          <p>Visibility</p>
          <span>{visibility} km</span>
        </div>
        <div className="flex flex-row w-3/4 justify-between">
          <p>Wind Speed</p>
          <span>{windSpeed} km/hr</span>
        </div>
      </div>
    </div>
  );
};

export default Data;
