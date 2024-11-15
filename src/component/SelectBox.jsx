import React, { useState } from "react";

function SelectBox({ options, label, onChange, className, disable = false }) {
  const [selectedValue, setSelectedValue] = useState(options[0]?.value || "");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block -mt-4 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        value={selectedValue}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectBox;
