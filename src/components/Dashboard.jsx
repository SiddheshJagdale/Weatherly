import React from "react";
import Image from "./Image.jsx";
import Data from "./Data.jsx";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-[100vh] w-full justify-start items-center">
      {/* h1 for Weatherly at the top */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 text-center mt-8">
        Weatherly
      </h1>

      {/* Main dashboard container below the h1 */}
      <div className="flex flex-col md:flex-row h-[80vh] w-[90vw] sm:w-[80vw] shadow-lg mt-4">
        <Image />
        <Data />
      </div>
    </div>
  );
};

export default Dashboard;
