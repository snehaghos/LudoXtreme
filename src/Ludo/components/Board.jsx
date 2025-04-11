import React from "react";

const Board = ({ renderPieces }) => {
  return (
    <div
      className="w-full h-full grid grid-cols-15 grid-rows-15 relative border-4 border-black"
      style={{ width: "600px", height: "600px" }}
    >
      {[...Array(15)].map((_, rowIndex) =>
        [...Array(15)].map((_, colIndex) => {
          let bgColor = "bg-white"; 
          
          if (rowIndex < 6 && colIndex < 6) bgColor = "bg-red-200";         
          else if (rowIndex < 6 && colIndex > 8) bgColor = "bg-green-200"; 
          else if (rowIndex > 8 && colIndex < 6) bgColor = "bg-blue-200";  
          else if (rowIndex > 8 && colIndex > 8) bgColor = "bg-yellow-200"; 
          
          if (
            (rowIndex === 6 || rowIndex === 8) ||
            (colIndex === 6 || colIndex === 8)
          ) {
            bgColor = "bg-gray-100"; 
          }

          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`border border-gray-300 relative ${bgColor}`}
            >
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

      {renderPieces()}
    </div>
  );
};

export default Board;