import React from "react";

const Tooltip = ({ visible, x, y, value }) => {
  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(10%, -220%)",
        background: "white",
        padding: "8px",
        borderRadius: "4px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div>{value || "No value"}%</div>
    </div>
  );
};

export default Tooltip;
