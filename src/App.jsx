import React, { useState, useEffect } from "react";
import Estimator from "./components/Estimator";
import ResultCard from "./components/ResultCard";
import Graphs from "./components/Graphs";
import InputField from "./components/InputField"; // InputField 컴포넌트 추가
import { loadExcelData } from "./utils/excelUtils";
import excelFile from "./data/predicted_survival10.xlsx";

const App = () => {
  const [epts, setEpts] = useState(50); // Default EPTS
  const [kdpi, setKdpi] = useState(50); // Default KDPI
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadExcelData(excelFile);
      setExcelData(data);
    };

    fetchData();
  }, []);
  const [results, setResults] = useState({
    waitlist: 0,
    kidney: 0,
    benefit: 0,
  });

  const handleInputChange = (e, type) => {
    const value = Math.min(Math.max(Number(e.target.value), 1), 100); // 1~100 범위로 제한
    if (type === "epts") setEpts(value);
    else if (type === "kdpi") setKdpi(value);
  };

  const handleResults = (newResults) => {
    setResults(newResults);
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-50 to-gray-50 min-h-screen py-10 space-y-10">
      {/* 입력 필드 */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          KDPI-EPTS Survival Benefit Estimator
        </h1>
        <p>
        Please enter the candidate's Estimated Post-Transplant Survival (EPTS) and the kidney's Kidney Donor Profile Index (KDPI).
        </p>
        <div className="flex space-x-4 justify-center mb-6">
          {/* InputField 컴포넌트를 사용 */}
          <InputField
            label="Candidate EPTS (1-100): "
            value={epts}
            onChange={handleInputChange}
            type="epts"
          />
          <InputField
            label="Kidney KDPI (1-100): "
            value={kdpi}
            onChange={handleInputChange}
            type="kdpi"
          />
        </div>
        <Estimator epts={epts} kdpi={kdpi} excelData={excelData} onEstimate={handleResults} />
      </div>

      {/* Result Cards */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Predicted 5-year survival if the candidate..
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResultCard
            title="Remains on waitlist"
            base="based on the candidate's EPTS"
            value={results.waitlist}
            color="gray"
          />
          <ResultCard
            title="Receives this kidney"
            base="based on the candidate's EPTS and the offered kidney's KDPI"
            value={results.kidney}
            color="green"
          />
          <ResultCard
            title="Survival benefit"
            base="based on the candidate's EPTS and the offered kidney's KDPI"
            value={results.benefit}
            color="blue"
          />
        </div>
      </div>

      {/* Graphs */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Graphs
        </h2>
        <Graphs epts={epts} kdpi={kdpi} excelData={excelData} />
      </div>
    </div>
  );
};

export default App;
