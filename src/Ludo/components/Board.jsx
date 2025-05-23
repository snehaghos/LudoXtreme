import React from "react";
import { homePositions, safePoints, escapePaths, skipPoints, mainpath, startingPoints } from "./constants";
import { FaStarOfDavid } from "react-icons/fa";
import { MdOutlineStars } from "react-icons/md";

const Board = ({ pieces, pieceImages, selectedPiece, movablePieces, handlePieceClick }) => {
  const renderGrid = () => {
    return [...Array(15 * 15)].map((_, index) => {
      const row = Math.floor(index / 15);
      const col = index % 15;
  
      const isRedHome = row < 6 && col < 6;
      const isGreenHome = row < 6 && col > 8;
      const isYellowHome = row > 8 && col > 8;
      const isBlueHome = row > 8 && col < 6;
  
      let bgColor = "bg-white";
      let zIndex = "z-0"; 
      let borderClass = "border border-gray-300"; 
  
      if (isRedHome) {
        bgColor = "bg-red-500";
        zIndex = "z-10"; 
        borderClass = ""; 
      } else if (isGreenHome) {
        bgColor = "bg-green-600";
        zIndex = "z-10"; 
        borderClass = ""; 
      } else if (isYellowHome) {
        bgColor = "bg-yellow-500";
        zIndex = "z-10"; 
        borderClass = "";
      } else if (isBlueHome) {
        bgColor = "bg-blue-600";
        zIndex = "z-10"; 
        borderClass = ""; 
      }
  
      const isEscapePath = Object.values(escapePaths).some(path =>
        path.some(([r, c]) => r === row && c === col)
      );
      const isSkipPoint = skipPoints.some(([r, c]) => r === row && c === col);
  
      if (isEscapePath) bgColor = "bg-gray-400";
      if (isSkipPoint) bgColor = "bg-purple-200";
  
      return (
        <div
          key={`cell-${index}`}
          className={`relative flex items-center justify-center text-xs text-white ${bgColor} ${zIndex} ${borderClass}`}
        >
          {/* {`(${row}, ${col})`} */}
        </div>
      );
    });
  };

  const renderPieces = () => {
    return Object.entries(pieces).flatMap(([color, playerPieces]) =>
      playerPieces.map((piece, index) => {
        const isSelected = selectedPiece?.color === color && selectedPiece?.index === index;
        const isMovable = movablePieces.some(
          (p) => p.color === color && p.index === index
        );
  
        const pieceStyles = {
          gridColumn: piece.isHome ? homePositions[color][index][1] + 1 : piece.position?.[1] + 1,
          gridRow: piece.isHome ? homePositions[color][index][0] + 1 : piece.position?.[0] + 1,
          borderColor: color,
          transform: isSelected ? "scale(1.1)" : "scale(1)",
          boxShadow: isMovable ? "0 0 10px 2px rgba(255, 255, 0, 0.8)" : "none",
          cursor: isMovable ? "pointer" : "default",
          transition: "all 0.2s ease",
        };
  
        return (
          <div
            key={`${color}-${index}`}
            className="absolute w-10 h-10 z-10  flex items-center justify-center"
            style={{
              gridColumn: pieceStyles.gridColumn,
              gridRow: pieceStyles.gridRow,
            }}
          >
            <div
              className="absolute w-10 h-10 z-20 border-2 bg-slate-100 rounded-full"
              style={pieceStyles}
              onClick={() => handlePieceClick(color, index)}
            >
              <img
                src={pieceImages[color]}
                alt={`${color} piece`}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        );
      })
    );
  };

  const renderSafePoints = () => {
    return safePoints.map((point, index) => (
      <div
        key={`safe-${index}`}
        className="absolute flex items-center justify-center z-10"
        style={{
          gridColumn: point[1] + 1,
          gridRow: point[0] + 1,
        }}
      >
        <span className="text-4xl flex justify-center items-center text-yellow-500 font-bold">
          <FaStarOfDavid />
        </span>
      </div>
    ));
  };

  const renderStartingPoints = () => {
    return Object.entries(startingPoints).map(([color, points]) =>
      points.map(([row, col], index) => (
        <div
          key={`start-${color}-${index}`}
          className={`absolute flex items-center justify-center   `}
          style={{
            gridColumn: col + 1,
            gridRow: row + 1,
          }}
        >
          <span className={`text-4xl flex justify-center items-center text-${color}-500 font-bold`}>
          <MdOutlineStars />
          </span>
        </div>
      ))
    );
  };

  return (
    <div className="relative grid grid-cols-15 grid-rows-15 w-[600px] h-[600px] border-2 border-gray-500 gap-0 p-2 ">
      {renderGrid()}
      {renderPieces()}
      {renderSafePoints()}
      {renderStartingPoints()}
    </div>
  );
};

export default Board;