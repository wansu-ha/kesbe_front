import React, { useEffect } from "react";
import useTooltip from "../hooks/useTooltip";
import waitlist_graph from "../imgs/waitlist_graph.png";
import survival_graph from "../imgs/survivalgraph.png";
import survival_legend from "../imgs/survival_legend.png";

const Graphs = ({ epts, kdpi, excelData }) => {
  const waitlistTooltip = useTooltip({
    x_min_percent: 0,
    x_max_percent: 100,
    y_min_percent: 0,
    y_max_percent: 50,
    excelData,
  });

  const survivalTooltip = useTooltip({
    x_min_percent: 20,
    x_max_percent: 92,
    y_min_percent: 15,
    y_max_percent: 90,
    excelData,
  });

  const benefitTooltip = useTooltip({
    x_min_percent: 20,
    x_max_percent: 92,
    y_min_percent: 15,
    y_max_percent: 95,
    excelData,
  });

  // 마커의 크기 정의
  const markerSize = 10;

  useEffect(() => {
    survivalTooltip.handleMarkerCoord(epts, kdpi); // 마커 좌표 업데이트
  }, [epts, kdpi, survivalTooltip]); // epts와 kdpi가 변경될 때만 실행

  useEffect(() => {
    waitlistTooltip.handleMarkerCoord(epts, 50); // 마커 좌표 업데이트
  }, [epts, waitlistTooltip]); // epts와 kdpi가 변경될 때만 실행

  useEffect(() => {
    benefitTooltip.handleMarkerCoord(epts, kdpi); // 마커 좌표 업데이트
  }, [epts, kdpi, benefitTooltip]); // epts와 kdpi가 변경될 때만 실행

  return (
    <div className="flex flex-col items-center space-y-10 w-full max-w-5xl mx-auto">
      <div className="relative bg-white shadow-lg rounded-lg p-4 overflow-hidden w-full"
      style={{
        height: "400px"
      }}>
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
          <div className="flex" style={{ width: "100px", height: "100%", marginRight: "20px" }}>
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
              onMouseMove={(event) => waitlistTooltip.handleMouseMove(event, event.currentTarget.getBoundingClientRect())}
              onMouseLeave={waitlistTooltip.handleMouseLeave}
            >
              {/* 마커 표시 */}
              <div
                style={{
                  position: "relative",
                  left: `${50}%`,
                  top: `${waitlistTooltip.coord.y}%`,
                  transform: `translate(-50%, -50%)`,
                  width: `${markerSize}px`,
                  height: `${markerSize}px`,
                  backgroundColor: "yellow",
                  borderRadius: "50%",
                  border: "2px solid black",
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
              height: "300px"
            }}
            onMouseMove={(event) => survivalTooltip.handleMouseMove(event, event.currentTarget.getBoundingClientRect())}
            onMouseLeave={survivalTooltip.handleMouseLeave}
          >
            {/* 마커 표시 */}
            <div
              style={{
                position: "relative",
                left: `${survivalTooltip.coord.x}%`,
                top: `${survivalTooltip.coord.y}%`,
                transform: `translate(-50%, -50%)`,
                width: `${markerSize}px`,
                height: `${markerSize}px`,
                backgroundColor: "yellow",
                borderRadius: "50%",
                border: "2px solid black",
              }}
            />
          </div>

          {/* Survival Legend (오른쪽 범례) */}
          <div className="flex" style={{ width: "100px", height: "100%", marginLeft: "20px"}}>
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
      </div>

      {/* Benefit Graph */}
      
      <div className="relative bg-white shadow-lg rounded-lg p-4 overflow-hidden w-full"
      style={{
        height: "400px"
      }}>
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Suvival Benefit
        </h2>
        <div
          className="flex h-full justify-center"
          style={{
            width: "100%",
          }}>

          {/* Benefit Graph */}
          <div
            className="relative"
            style={{
              backgroundImage: `url(${survival_graph})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              width: "400px",
              height: "300px"
            }}
            onMouseMove={(event) => survivalTooltip.handleMouseMove(event, event.currentTarget.getBoundingClientRect())}
            onMouseLeave={survivalTooltip.handleMouseLeave}
          >
            {/* 마커 표시 */}
            <div
              style={{
                position: "relative",
                left: `${survivalTooltip.coord.x}%`,
                top: `${survivalTooltip.coord.y}%`,
                transform: `translate(-50%, -50%)`,
                width: `${markerSize}px`,
                height: `${markerSize}px`,
                backgroundColor: "yellow",
                borderRadius: "50%",
                border: "2px solid black",
              }}
            />
          </div>

          {/* Survival Legend (오른쪽 범례) */}
          <div className="flex" style={{ width: "100px", height: "100%", marginLeft: "20px"}}>
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
      </div>
      {/* Tooltip */}
      {survivalTooltip.tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: `${survivalTooltip.tooltip.x}px`,
            top: `${survivalTooltip.tooltip.y}px`,
            transform: "translate(10%, -220%)",
            background: "white",
            padding: "8px",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div>{survivalTooltip.tooltip.data.kidney || "No Data"}%</div>
        </div>
      )}
      {waitlistTooltip.tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: `${waitlistTooltip.tooltip.x}px`,
            top: `${waitlistTooltip.tooltip.y}px`,
            transform: "translate(10%, -220%)",
            background: "white",
            padding: "8px",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div>{waitlistTooltip.tooltip.data.kidney || "No Data"}%</div>
        </div>
      )}
      {benefitTooltip.tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: `${benefitTooltip.tooltip.x}px`,
            top: `${benefitTooltip.tooltip.y}px`,
            transform: "translate(10%, -220%)",
            background: "white",
            padding: "8px",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div>{benefitTooltip.tooltip.data.kidney || "No Data"}%</div>
        </div>
      )}
    </div>
  );
};

export default Graphs;
