import React from "react";
import SurvivalGraph from "./SurvivalGraph";
import BenefitGraph from "./BenefitGraph";

const Graphs = ({ epts, kdpi, excelData }) => {
  // 마커의 크기 정의
  const markerSize = 10;

  return (
    <div className="flex flex-col items-center space-y-10 w-full max-w-5xl mx-auto">
      <SurvivalGraph epts={epts} kdpi={kdpi} excelData={excelData} markerSize={markerSize}/>
      <BenefitGraph epts={epts} kdpi={kdpi} excelData={excelData} markerSize={markerSize}/>
    </div>
  );
};

export default Graphs;
