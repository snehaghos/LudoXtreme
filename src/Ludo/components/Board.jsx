import React from "react";

const Board = ({ renderPieces }) => {
  return (
    <div
      className="w-full h-full grid grid-cols-15 grid-rows-15 relative border-4 border-black"
      style={{ width: "600px", height: "600px" }}
    >
      {[...Array(15)].map((_, rowIndex) =>
        [...Array(15)].map((_, colIndex) => {
          let bgColor = "bg-white"; // Default white
          
          // Home areas with lighter colors
          if (rowIndex < 6 && colIndex < 6) bgColor = "bg-red-200";         // Top-left (Red)
          else if (rowIndex < 6 && colIndex > 8) bgColor = "bg-green-200"; // Top-right (Green)
          else if (rowIndex > 8 && colIndex < 6) bgColor = "bg-blue-200";  // Bottom-left (Blue)
          else if (rowIndex > 8 && colIndex > 8) bgColor = "bg-yellow-200"; // Bottom-right (Yellow)
          
          // Main paths (keeping original colors)
          if (
            (rowIndex === 6 || rowIndex === 8) ||
            (colIndex === 6 || colIndex === 8)
          ) {
            bgColor = "bg-gray-100"; // Light gray for paths
          }

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`border border-gray-300 relative ${bgColor}`}
            >
              {/* Optional: show coordinates */}
              <span
                className="text-[8px] absolute top-0 left-0 text-black"
                style={{ opacity: 0.4 }}
              >
                {rowIndex},{colIndex}
              </span>
            </div>
          );
        })
      )}

      {/* Render player pieces over the grid */}
      {renderPieces()}
    </div>
  );
};

export default Board;