import React from "react";
import Image from "./Image.jsx";
import Data from "./Data.jsx";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row h-[100vh] w-full justify-center items-center ">
      <div className="flex flex-col md:flex-row h-[80vh] w-[90vw] sm:w-[80vw] shadow-lg">
        <Image />
        <Data />
      </div>
    </div>
  );
};

export default Dashboard;
