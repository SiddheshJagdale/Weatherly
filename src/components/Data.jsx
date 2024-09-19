import React, { useState } from "react";
import { IoSunnyOutline } from "react-icons/io5";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Input from "./Input.jsx";

const Data = () => {
  // State to store input value
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  // Function to handle input value change
  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  useGSAP(() => {
    gsap.to("#icon", {
      rotation: 360,
      duration: 5,
      delay: 1,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  return (
    <div className="flex flex-col items-center p-4 h-full w-full md:w-[40%] gap-4 backdrop-blur">
      {/* Weather */}
      <div className="flex flex-row gap-4 items-center h-[20%]">
        <h2 className=" text-4xl ">Sunny</h2>
        <div className="text-6xl" id="icon">
          <IoSunnyOutline />
        </div>
      </div>

      {/* Input Field */}
      <Input onInputChange={handleInputChange} />

      {/* Display the input value */}
      <div className="text-2xl">{inputValue}</div>

      {/* Specifics */}
      <div className="flex flex-col items-center px-5 h-[60%] w-full gap-5 text-2xl">
        <div className="flex flex-row w-3/4 justify-between">
          <p>Temperature</p>
          <span>45</span>
        </div>
        <div className="flex flex-row w-3/4 justify-between">
          <p>Humidity</p>
          <span>45</span>
        </div>
        <div className="flex flex-row w-3/4 justify-between">
          <p>Visibility</p>
          <span>45</span>
        </div>
        <div className="flex flex-row w-3/4 justify-between">
          <p>Wind Speed</p>
          <span>45</span>
        </div>
      </div>
    </div>
  );
};

export default Data;
