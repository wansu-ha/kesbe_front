import React from "react";

const ResultCard = ({ title, base, value, colors, offset = 0 }) => {
  value = Math.min(Math.max(value, 0), 100)

  return (
    <div
      className={`rounded-lg p-5 shadow-md text-center flex flex-col`}
      style={{ backgroundColor: colors[Math.ceil(value / 10) - 1 + offset] }}
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <small>{base}</small>
      <p className="text-4xl font-bold mt-auto">
        {value !== null ? `${value}%` : "-"}
      </p>
    </div>
  );
};

export default ResultCard;
