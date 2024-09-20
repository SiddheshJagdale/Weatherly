import React, { useEffect, useState } from "react";
import sunnyDay from "../images/blue-sky-with-cloud-sunshine-day_1234738-421089.avif";
import { useWeatherStore } from "../libs/zustand/store";

const Image = () => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const temperature = useWeatherStore((state) => state.temperature); // Zustand state access

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Formatting date and time dynamically
  const day = daysOfWeek.at(time.getDay() - 1);
  const todaysDate = time.getDate();
  const month = monthsOfYear.at(time.getMonth());
  const hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, "0"); // Padding for double digits
  const seconds = time.getSeconds();
  const ampm = time.getHours() >= 12 ? "PM" : "AM";

  return (
    <div
      className="flex flex-col justify-end h-[50vh] md:h-full w-full md:w-[60%] bg-cover bg-center"
      style={{ backgroundImage: `url(${sunnyDay})` }}
    >
      <div className="flex flex-row  h-30% md:h-[20%] px-4 py-2 text-white bg-black/50 backdrop-blur-sm">
        {/* Location and Time */}
        <div className="flex flex-col w-[80%] justify-center items-start gap-2">
          <div className="text-lg sm:text-2xl font-semibold">{`${hours}:${minutes}:${seconds}  ${ampm}`}</div>
          <div className="text-xl sm:text-3xl">{`${day}, ${todaysDate} ${month}`}</div>
        </div>

        {/* Temperature */}
        <div className="flex items-end justify-end w-[20%] text-4xl sm:text-5xl">
          {temperature}°
        </div>
      </div>
    </div>
  );
};

export default Image;
