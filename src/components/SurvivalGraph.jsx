import React, { useEffect } from "react";
import useTooltip from "../hooks/useTooltip";
import waitlist_graph from "../imgs/waitlist_graph.png";
import survival_graph from "../imgs/survivalgraph.png";
import survival_legend from "../imgs/survival_legend.png";
import Tooltip from "./Tooltip";

const SurvivalGraph = ({ epts, kdpi, excelData, markerSize }) => {
  const waitlistTooltip = useTooltip({
    x_min_percent: 0,
    x_max_percent: 100,
    y_min_percent: 0,
    y_max_percent: 100,
    excelData: excelData,
  });

  const survivalTooltip = useTooltip({
    x_min_percent: 20.5,
    x_max_percent: 92,
    y_min_percent: 5,
    y_max_percent: 84,
    excelData: excelData,
  });
  useEffect(() => {
    waitlistTooltip.handleMarkerCoord(epts, 1); // 마커 좌표 업데이트
  }, [epts]); // epts와 kdpi가 변경될 때만 실행

  useEffect(() => {
    survivalTooltip.handleMarkerCoord(epts, kdpi); // 마커 좌표 업데이트
  }, [epts, kdpi]); // epts와 kdpi가 변경될 때만 실행

  return (
    <div
      className="relative bg-white shadow-lg rounded-lg p-4 overflow-hidden w-full"
      style={{
        height: "400px",
      }}
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Waitlist vs. Post-Transplant Survival with Legend
      </h2>
      <br />
      <div
        className="flex h-full justify-center"
        style={{
          width: "100%",
        }}
      >
        {/* Waitlist Graph */}
        <div
          className="flex"
          style={{ width: "100px", height: "100%", marginRight: "20px" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // 숫자 간 간격 동일하게 분배
              height: "calc(70% + 20px)", // 그래프와 동일한 높이
              marginRight: "10px", // 그래프와 간격
              marginTop: "-10px",
            }}
          >
            {[100, 80, 60, 40, 20, 0].map((num) => (
              <div
                key={num}
                style={{
                  fontSize: "12px",
                  color: "black",
                  textAlign: "right", // 오른쪽 정렬
                }}
              >
                {num}
              </div>
            ))}
          </div>

          <div
            style={{
              backgroundImage: `url(${waitlist_graph})`,
              backgroundSize: "100% 100%", // 이미지가 컨테이너에 맞게 조정
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "100%", // 컨테이너 전체에 맞춤
              height: "70%", // 컨테이너 전체에 맞춤
            }}
            onMouseMove={(event) =>
              waitlistTooltip.handleMouseMove(
                event,
                event.currentTarget.getBoundingClientRect()
              )
            }
            onMouseLeave={waitlistTooltip.handleMouseLeave}
          >
            {/* 마커 표시 */}
            <div
              className="marker"
              style={{
                left: `${50}%`,
                top: `${waitlistTooltip.coord.y}%`,
                width: `${markerSize}px`,
                height: `${markerSize}px`,
              }}
            />
            {/* "Waitlist" Text */}
            <div
              style={{
                position: "relative",
                top: "-30px", // 범례 상단에 배치
                //left: "10%",
                //transform: "translateX(-50%)", // 중앙 정렬
                fontSize: "14px",
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
              }}
            >
              Waitlist
            </div>
          </div>
        </div>

        {/* Survival Graph */}
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
            survivalTooltip.handleMouseMove(
              event,
              event.currentTarget.getBoundingClientRect()
            )
          }
          onMouseLeave={survivalTooltip.handleMouseLeave}
        >
          {/* 마커 표시 */}
          <div
            className="marker"
            style={{
              left: `${survivalTooltip.coord.x}%`,
              top: `${survivalTooltip.coord.y}%`,
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
        visible={waitlistTooltip.tooltip.visible}
        x={waitlistTooltip.tooltip.x}
        y={waitlistTooltip.tooltip.y}
        value={waitlistTooltip.tooltip.data?.wait}
      />

      <Tooltip
        visible={survivalTooltip.tooltip.visible}
        x={survivalTooltip.tooltip.x}
        y={survivalTooltip.tooltip.y}
        value={survivalTooltip.tooltip.data?.kidney}
      />
    </div>
  );
};

export default SurvivalGraph;
