import React from "react";

const InputItem = ({
  required,
  label,
  type,
  step,
  // onValueChange,
  placeholder,
}) => {
  return (
    <div className="ma1">
      <label
        for={`fInput${label}`}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        id={`fInput${label}`}
        type={type}
        name={`fInput${label}`}
        required={required}
        placeholder={placeholder}
        step={step}
        // onChange={(e) => onValueChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default InputItem;
