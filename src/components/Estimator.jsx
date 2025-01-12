import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import excelFile from "../data/predicted_survival10.xlsx"; // 엑셀 파일 경로

const Estimator = ({ epts, kdpi, onEstimate }) => {
  const [excelData, setExcelData] = useState([]);

  // 컴포넌트 로드시 엑셀 파일 읽기
  useEffect(() => {
    const fetchExcelData = async () => {
      try {
        const response = await fetch(excelFile); // 고정된 경로에서 엑셀 파일 가져오기
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0]; // 첫 번째 시트
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(jsonData); // 엑셀 데이터를 상태에 저장
        console.log(excelData);
      } catch (error) {
        console.error("Error loading Excel file:", error);
      }
    };

    fetchExcelData();
  }, []); // 컴포넌트 로드시 1회 실행

  const handleEstimate = () => {
    if (excelData.length === 0) {
      alert("Excel data not loaded yet.");
      return;
    }

    // kdpi와 epts에 따라 데이터를 찾음
    const matchedRow = excelData.find(
      (row) => row.K_KDPI === parseFloat(kdpi) && row.K_EPTS === parseFloat(epts)
    );

    if (!matchedRow) {
      alert("No matching data found in the Excel file.");
      return;
    }

    // 결과 출력
    onEstimate({
      waitlist: matchedRow.predicted_survival10.toFixed(2) - 10,
      kidney: matchedRow.predicted_survival10.toFixed(2),
      benefit: 10
    });
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
