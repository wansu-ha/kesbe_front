import { useState } from "react";
import { findMatchingRow, calculateSurvival } from "../utils/excelUtils";

const useTooltip = ({ x_min_percent, x_max_percent, y_min_percent, y_max_percent, excelData }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    kdpi: 0,
    epts: 0,
    data: null,
  });
  
  const [coord, setCoord] = useState({
    x: 0,
    y: 0,
  });

  const handleMouseMove = (event, graphRect) => {
    const mouseX = event.clientX - graphRect.left;
    const mouseY = event.clientY - graphRect.top;

    // 마우스 퍼센트 위치 계산
    const mousePercentX = (mouseX / graphRect.width) * 100;
    const mousePercentY = (mouseY / graphRect.height) * 100;

    // 역변환: kdpi와 epts 계산
    let calculatedKdpi = Math.round(
      ((mousePercentX - x_min_percent) / (x_max_percent - x_min_percent)) * 100
    );
    let calculatedEpts = Math.round(
      (1 - ((mousePercentY - (100 - y_max_percent)) / (y_max_percent - y_min_percent))) * 100
    );

    // 범위를 벗어나지 않도록 클램핑
    calculatedKdpi = Math.min(Math.max(calculatedKdpi, 0), 100);
    calculatedEpts = Math.min(Math.max(calculatedEpts, 0), 100);

    // 데이터 찾기
    const matchedRow = findMatchingRow(excelData, calculatedKdpi, calculatedEpts);
    if (!matchedRow) {
      setTooltip({ visible: false });
      return;
    }

    const results = calculateSurvival(matchedRow);

    // 툴팁 업데이트
    setTooltip({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      kdpi: calculatedKdpi,
      epts: calculatedEpts,
      data: results,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false });
  };

  const handleMarkerCoord = (epts, kdpi) => {
    // X축과 Y축 변환
    const rawX = kdpi; // X축 원래 좌표 (0 ~ 100)
    const rawY = epts; // Y축 원래 좌표 (0 ~ 100)

    // X축 변환: 0~100 입력값을 20%~90% 범위로 변환
    const x =
    (rawX / 100) * (x_max_percent - x_min_percent) + x_min_percent;

    // Y축 변환: 0~100 입력값을 20%~90% 범위로 변환 (위 -> 아래 방향 유지)
    const y =
      (100 - y_max_percent) + (1 - rawY / 100) * (y_max_percent - y_min_percent);

    return setCoord({ x, y });
  }

  return { tooltip, coord, handleMouseMove, handleMouseLeave, handleMarkerCoord };
};

export default useTooltip;
