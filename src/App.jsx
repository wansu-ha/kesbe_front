import React, { useState, useEffect } from "react";
import Estimator from "./components/Estimator";
import ResultCard from "./components/ResultCard";
import Graphs from "./components/Graphs";
import InputField from "./components/InputField"; // InputField 컴포넌트 추가
import { loadExcelData } from "./utils/excelUtils";
import survivalExcelFile from "./data/survival_data.xlsx";

const App = () => {
  const [epts, setEpts] = useState(50); // Default EPTS
  const [kdpi, setKdpi] = useState(50); // Default KDPIa
  const [survivalExcelData, setSurvivalExcelData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const survivalData = await loadExcelData(survivalExcelFile);
      setSurvivalExcelData(survivalData);
    };

    fetchData();
  }, []);

  const [results, setResults] = useState({
    wait: 0,
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
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          KDPI-EPTS Survival Benefit Estimator
        </h1>
        <p>
        Please enter the candidate's Estimated Post-Transplant Survival (EPTS) and the kidney's Kidney Donor Profile Index (KDPI).
        </p>
        <br />
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
        <Estimator epts={epts} kdpi={kdpi} excelData={survivalExcelData} onEstimate={handleResults} />
      </div>

      {/* Result Cards */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Predicted 5-year survival if the candidate..
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResultCard
            title="Remains on waitlist"
            base="based on the candidate's EPTS"
            value={results.wait}
            colors={[
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
            ]}
          />
          <ResultCard
            title="Receives this kidney"
            base="based on the candidate's EPTS and the offered kidney's KDPI"
            value={results.kidney}
            colors={[
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
            ]}
          />
          <ResultCard
            title="Survival benefit"
            base="based on the candidate's EPTS and the offered kidney's KDPI"
            value={results.benefit}
            colors={[
              "#56F348",  //  0~10
              "#56F348",  // 11~20
              "#56F348",  // 21~30
              "#9AF796",  // 31~40
              "#4BF23A",  // 41~50
              "#3DE12A",  // 51~60
              "#2DAE1E",  // 61~70
              "#249017",  // 71~80
              "#1E7E13",  // 81~90
              "#16650D"   // 91~100
            ]}
          />
        </div>
      </div>

      {/* Graphs */}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Graphs
        </h2>
        <Graphs epts={epts} kdpi={kdpi} excelData={survivalExcelData} />
      </div>
    </div>
  );
};

export default App;
