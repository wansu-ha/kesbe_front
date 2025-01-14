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

// 생존률 계산 로직
export const calculateSurvival = (excelData, kdpi, epts) => {
  kdpi = Math.min(Math.max(kdpi, 1), 100);
  epts = Math.min(Math.max(epts, 1), 100);
  
  let matchedRow = excelData.find(
    (row) =>
      parseFloat(row.K_KDPI) === parseFloat(kdpi) &&
      parseFloat(row.K_EPTS) === parseFloat(epts)
  );
  
  if (!matchedRow) {
    //alert("(" + epts + ", " + kdpi + ") No matching data found.");
    return;
  }
  
  return {
    wait: parseFloat(matchedRow.wait).toFixed(2),
    kidney: parseFloat(matchedRow.kidney).toFixed(2),
    benefit: parseFloat(matchedRow.benefit).toFixed(2),
  };
};
