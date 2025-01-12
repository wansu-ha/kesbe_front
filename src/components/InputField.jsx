import React from "react";

const InputField = ({ label, value, onChange, type }) => {
  return (
    <div>
      <label className="inline text-gray-700 font-medium mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e, type)}
        className="w-24 border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
        min="1"
        max="100"
      />
    </div>
  );
};

export default InputField;
