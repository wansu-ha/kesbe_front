import React, { useState, useEffect } from "react";
import { findMatchingRow, calculateSurvival } from "../utils/excelUtils";

const Estimator = ({ epts, kdpi, excelData, onEstimate }) => {
  const handleEstimate = () => {
    if (excelData.length === 0) {
      alert("Excel data is still loading. Please wait and try again.");
      return;
    }
    
    const results = calculateSurvival(excelData, kdpi, epts);
    onEstimate(results);
  };

  return (
    <div className="col-span-1 md:col-span-2">
      <button
        onClick={handleEstimate}
        className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Estimate
      </button>
    </div>
  );
};

export default Estimator;
