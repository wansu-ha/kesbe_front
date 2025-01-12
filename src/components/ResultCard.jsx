import React from "react";

const ResultCard = ({ title, base, value, color }) => {
  const colorClasses = {
    gray: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
  };

  return (
    <div
      className={`rounded-lg p-6 shadow-md text-center ${colorClasses[color]}`}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <small>{base}</small>
      <p className="text-4xl font-bold">
        {value !== null ? `${value}%` : "-"}
      </p>
    </div>
  );
};

export default ResultCard;
