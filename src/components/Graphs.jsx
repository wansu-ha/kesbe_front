import React from "react";
import waitlist_graph from "../imgs/survival_legend.png";
import survival_graph from "../imgs/survivalgraph.png";
import survival_legend from "../imgs/survivallegend.png";

const Graphs = ({ epts, kdpi }) => {
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
    (100 - y_max_percent) + (1 - (rawY) / 100) * (y_max_percent - y_min_percent);

  // 마커의 크기 정의 (10x10 픽셀)
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
        <div
          className="flex h-full justify-center"
          style={{
            width: "100%",
          }}>
          {/* Waitlist Graph */}
          <div className="relative" style={{ width: "100px", height: "100%", marginRight: "20px" }}>
            {/* "Waitlist" Text */}
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
              Waitlist
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
            />
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
                right: "-80px", // 범례 옆에 배치
                top: "35%",
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

    </div>
  );
};

export default Graphs;
