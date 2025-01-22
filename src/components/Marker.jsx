const Marker = ({ left, top, width, height }) => {
  return (
    <div
      className="marker"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
};

export default Marker;
