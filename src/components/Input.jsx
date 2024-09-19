import React, { useState } from "react";

const Input = ({ onInputChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onInputChange(e.target.value); // Update parent component state
  };

  return (
    <div>
      <input
        value={value}
        onChange={handleChange}
        placeholder="Enter your location"
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Input;
