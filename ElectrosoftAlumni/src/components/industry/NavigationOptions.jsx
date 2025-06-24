import React from "react";

const NavigationOptions = ({ selectedOption, onOptionSelect, options, className = "" }) => {
  return (
    <div className={`flex gap-2 mb-4 ${className}`} style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onOptionSelect(option)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            selectedOption === option
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          style={{ whiteSpace: 'nowrap' }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default NavigationOptions;
