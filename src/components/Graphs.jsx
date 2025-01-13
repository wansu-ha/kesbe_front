import React, { useState } from "react";
import { findMatchingRow, calculateSurvival } from "../utils/excelUtils";
import waitlist_graph from "../imgs/waitlist_graph.png";
import survival_graph from "../imgs/survivalgraph.png";
import survival_legend from "../imgs/survival_legend.png";

const Graphs = ({ epts, kdpi, excelData }) => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    kdpi: 0,
    epts: 0,
    kidney: 0,
  });

  // X축과 Y축 변환
  const rawX = kdpi; // X축 원래 좌표 (0 ~ 100)
  const rawY = epts; // Y축 원래 좌표 (0 ~ 100)

  // 그래프에서의 퍼센트 단위 한계값 정의
  const x_min_percent = 20; // X축 최소 퍼센트
  const x_max_percent = 92; // X축 최대 퍼센트
  const y_min_percent = 15; // Y축 최소 퍼센트
  const y_max_percent = 95; // Y축 최대 퍼센트

  // X축 변환: 0~100 입력값을 20%~90% 범위로 변환
  const x =
    (rawX / 100) * (x_max_percent - x_min_percent) + x_min_percent;

  // Y축 변환: 0~100 입력값을 20%~90% 범위로 변환 (위 -> 아래 방향 유지)
  const y =
    (100 - y_max_percent) + (1 - rawY / 100) * (y_max_percent - y_min_percent);
    
  // 마우스 이벤트 핸들러
  const handleMouseMove = (event) => {
    const graphRect = event.currentTarget.getBoundingClientRect(); // 그래프 위치
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

    //calculatedKdpi = Math.min(Math.max(calculatedKdpi, 1), 100);
    //calculatedEpts = Math.min(Math.max(calculatedEpts, 1), 100);

     // kdpi와 epts에 따라 데이터를 찾음
    const matchedRow = findMatchingRow(excelData, calculatedKdpi, calculatedEpts);
    if (!matchedRow) {
      //alert("No matching data found.");
      setTooltip({});
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
      wait: null,
      kidney: results.kidney,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  // 마커의 크기 정의
  const markerSize = 10;

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
              //onMouseMove={handleMouseMove}
              //onMouseLeave={handleMouseLeave}
            >
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
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* 마커 표시 */}
            <div
              style={{
                position: "absolute",
                left: `${x}%`, // X좌표
                top: `${y}%`, // Y좌표
                transform: `translate(-50%, -50%)`,
                width: `${markerSize}px`,
                height: `${markerSize}px`,
                backgroundColor: "yellow",
                borderRadius: "50%",
                border: "2px solid black",
              }}
            ></div>
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
          >
            {/* 마커 표시 */}
            <div
              style={{
                position: "absolute",
                left: `${x}%`, // X좌표
                top: `${y}%`, // Y좌표
                transform: `translate(-50%, -50%)`,
                width: `${markerSize}px`,
                height: `${markerSize}px`,
                backgroundColor: "yellow",
                borderRadius: "50%",
                border: "2px solid black",
              }}
            ></div>
          </div>

          {/* Benefit Legend (오른쪽 범례) */}
          <div className="relative" style={{ width: "100px", height: "100%", marginLeft: "20px"}}>
            {/* "Legend" Text */}
            <div
              style={{
                position: "absolute",
                top: "-20px", // 범례 상단에 배치
                left: "50%",
                transform: "translateX(-50%)", // 중앙 정렬
                fontSize: "14px",
                fontWeight: "bold",
                color: "black",
                textAlign: "center",
              }}
            >
              Legend
            </div>
            <div
              style={{
                backgroundImage: `url(${survival_legend})`,
                backgroundSize: "100% 100%", // 이미지가 컨테이너에 맞게 조정
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%", // 컨테이너 전체에 맞춤
                height: "70%", // 컨테이너 전체에 맞춤
              }}
            />
            {/* Rotated Text */}
            <div
              style={{
                position: "absolute",
                right: "-100px", // 범례 옆에 배치
                top: "35%",
                transform: "translateY(-50%) rotate(-90deg)", // 텍스트 회전
                transformOrigin: "center",
                fontSize: "12px",
                fontWeight: "bold",
                color: "black",
                whiteSpace: "nowrap",
              }}
            >
              Risk difference (percentage points)
            </div>
          </div>

        </div>
      </div>

      {/* 툴팁 */}
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`,
            transform: "translate(10%, -220%)",
            background: "white",
            padding: "8px",
            borderRadius: "4px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div>{tooltip.wait || tooltip.kidney}%</div>
        </div>
      )}
    </div>
  );
};

export default Graphs;
