import React, { useEffect } from "react";
import useTooltip from "../hooks/useTooltip";
import survival_graph from "../imgs/survival_graph.png";
import survival_legend from "../imgs/survival_legend.png";
import Tooltip from "./Tooltip";

const BenefitGraph = ({ epts, kdpi, excelData, markerSize }) => {
  const benefitTooltip = useTooltip({
    x_min_percent: 20,
    x_max_percent: 92,
    y_min_percent: 15,
    y_max_percent: 95,
    excelData: excelData,
  });

  useEffect(() => {
    benefitTooltip.handleMarkerCoord(epts, kdpi); // 마커 좌표 업데이트
  }, [epts, kdpi]); // epts와 kdpi가 변경될 때만 실행

  return (
    <div
      className="relative bg-white shadow-lg rounded-lg p-4 overflow-hidden w-full"
      style={{
        height: "400px",
      }}
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Suvival Benefit
      </h2>
      <div
        className="flex h-full justify-center"
        style={{
          width: "100%",
        }}
      >
        {/* Benefit Graph */}
        <div
          className="relative"
          style={{
            backgroundImage: `url(${survival_graph})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "400px",
            height: "300px",
          }}
          onMouseMove={(event) =>
            benefitTooltip.handleMouseMove(
              event,
              event.currentTarget.getBoundingClientRect()
            )
          }
          onMouseLeave={benefitTooltip.handleMouseLeave}
        >
          {/* 마커 표시 */}
          <div
            className="marker"
            style={{
              left: `${benefitTooltip.coord.x}%`,
              top: `${benefitTooltip.coord.y}%`,
              width: `${markerSize}px`,
              height: `${markerSize}px`,
            }}
          />
        </div>

        {/* Survival Legend (오른쪽 범례) */}
        <div
          className="flex"
          style={{ width: "100px", height: "100%", marginLeft: "20px" }}
        >
          <div
            style={{
              backgroundImage: `url(${survival_legend})`,
              backgroundSize: "100% 100%", // 이미지가 컨테이너에 맞게 조정
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "30%", // 컨테이너 전체에 맞춤
              height: "70%", // 컨테이너 전체에 맞춤
            }}
          >
            {/* "Legend" Text */}
            <div
              style={{
                position: "relative",
                top: "-30px", // 범례 상단에 배치
                //left: "80%",
                //transform: "translateX(-50%)", // 중앙 정렬
                fontSize: "14px",
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
              }}
            >
              Legend
            </div>

            {/* Rotated Text */}
            <div
              style={{
                position: "relative",
                right: "-50px", // 범례 옆에 배치
                top: "60%",
                transform: "translateY(-50%) rotate(-90deg)", // 텍스트 회전
                transformOrigin: "center",
                fontSize: "12px",
                fontWeight: "bold",
                color: "black",
                whiteSpace: "nowrap",
              }}
            >
              5-year patient survival (%)
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // 숫자 간 간격 동일하게 분배
              height: "calc(70% + 20px)", // 그래프와 동일한 높이
              marginLeft: "10px", // 그래프와 간격
              marginTop: "-10px",
            }}
          >
            {[100, 80, 60, 40, 20, 0].map((num) => (
              <div
                key={num}
                style={{
                  fontSize: "12px",
                  color: "black",
                  textAlign: "left", // 오른쪽 정렬
                }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Tooltip
        visible={benefitTooltip.tooltip.visible}
        x={benefitTooltip.tooltip.x}
        y={benefitTooltip.tooltip.y}
        value={benefitTooltip.tooltip.data?.kidney}
      />
    </div>
  );
};

export default BenefitGraph;
