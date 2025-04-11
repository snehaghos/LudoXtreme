
import React from "react";
import "../css/Pawn.css" 

const Pawn = ({ color, position, onClick }) => {
    if (!position) return null;
  
    return (
      <div
        className={`pawn ${color}`}
        onClick={onClick}
        style={{
          position: "absolute",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          backgroundColor: color,
          left: `${position.x * 40}px`,
          top: `${position.y * 40}px`,
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
      />
    );
  };
  
export default Pawn;
