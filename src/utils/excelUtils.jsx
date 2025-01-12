import * as XLSX from "xlsx";

// 엑셀 파일 로드 함수
export const loadExcelData = async (excelFile) => {
  try {
    const response = await fetch(excelFile);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    return jsonData;
  } catch (error) {
    console.error("Error loading Excel file:", error);
    throw new Error("Failed to load Excel data");
  }
};

// KDPI와 EPTS에 따라 데이터를 검색하는 함수
export const findMatchingRow = (excelData, kdpi, epts) => {
  return excelData.find(
    (row) =>
      parseFloat(row.K_KDPI) === parseFloat(kdpi) &&
      parseFloat(row.K_EPTS) === parseFloat(epts)
  );
};

// 생존률 계산 로직
export const calculateSurvival = (matchedRow) => {
  const predictedSurvival10 = parseFloat(matchedRow.predicted_survival10);
  const waitlistSurvival = predictedSurvival10 - 10; // 예제 계산
  const kidneySurvival = predictedSurvival10; // 예제 계산
  const survivalBenefit = kidneySurvival - waitlistSurvival;

  return {
    wait: waitlistSurvival.toFixed(2),
    kidney: kidneySurvival.toFixed(2),
    benefit: survivalBenefit.toFixed(2),
  };
};
