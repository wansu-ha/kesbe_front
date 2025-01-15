import { useState } from "react";
import { calculateSurvival } from "../utils/excelUtils";

const useTooltip = ({ x_min_percent, x_max_percent, y_min_percent, y_max_percent, excelData }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    kdpi: 0,
    epts: 0,
    data: {
      wait: 0,
      kidney: 0,
      benefit: 0,
    },
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
    if (
      mousePercentX >= x_min_percent &&
      mousePercentX <= x_max_percent &&
      mousePercentY >= y_min_percent &&
      mousePercentY <= y_max_percent)
    {
      let calculatedKdpi = Math.round(
        ((mousePercentX - x_min_percent) / (x_max_percent - x_min_percent)) * 100
      );
      let calculatedEpts = Math.round(
        (1 - ((mousePercentY - (100 - y_max_percent)) / (y_max_percent - y_min_percent))) * 100
      );
  
      const results = calculateSurvival(excelData, calculatedKdpi, calculatedEpts);
  
      // 툴팁 업데이트
      setTooltip({
        visible: true,
        x: event.clientX,
        y: event.clientY,
        kdpi: calculatedKdpi,
        epts: calculatedEpts,
        data: results,
      });
    } else {
      setTooltip({
        visible: false,
      })
    }
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false });
  };

  const handleMarkerCoord = (epts, kdpi) => {
    const rawX = kdpi;
    const rawY = epts;

    const x =
    (rawX / 100) * (x_max_percent - x_min_percent) + x_min_percent;

    const y =
      (1 - rawY / 100) * (y_max_percent - y_min_percent) + y_min_percent;

    setCoord({ x, y });
  }

  return { tooltip, coord, handleMouseMove, handleMouseLeave, handleMarkerCoord };
};

export default useTooltip;
