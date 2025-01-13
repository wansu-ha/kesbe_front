import React from "react";

const ResultCard = ({ title, base, value, color }) => {
  function getColor(value) {
    const colors = [
      "#6B000C",        //  0~10
      "darkred",        // 11~20
      "firebrick",      // 21~30
      "red",            // 31~40
      "lightcoral",     // 41~50
      "lightpink",      // 51~60
      "lavenderblush",  // 61~70
      "lightcyan",      // 71~80
      "skyblue",        // 81~90
      "blue"            // 91~100
    ];

    return colors[value];
  }

  value = Math.min(Math.max(value, 0), 100)

  return (
    <div
      className={`rounded-lg p-6 shadow-md text-center`}
      style={{ backgroundColor: getColor(Math.ceil(value / 10) - 1) }}
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
