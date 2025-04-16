import React from "react";
import { homePositions, safePoints ,escapePaths,skipPoints} from "./constants";

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
  
      const isEscapePath = Object.values(escapePaths).some(path =>
        path.some(([r, c]) => r === row && c === col)
      );
      const isSkipPoint = skipPoints.some(([r, c]) => r === row && c === col);
  
      if (isEscapePath) bgColor = "bg-gray-400";
      if (isSkipPoint) bgColor = "bg-purple-200"; 
  

      if (isRedHome) bgColor = "bg-red-200";
      else if (isGreenHome) bgColor = "bg-green-200";
      else if (isYellowHome) bgColor = "bg-yellow-200";
      else if (isBlueHome) bgColor = "bg-blue-200";
  
      return (
        <div
          key={`cell-${index}`}
          className={`relative flex items-center justify-center border border-gray-300 text-xs text-white ${bgColor}`}
        >
          {`(${row}, ${col})`}
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
            className="absolute w-10 h-10 z-20 border-2 rounded-full"
            style={pieceStyles}
            onClick={() => handlePieceClick(color, index)}
          >
            <img
              src={pieceImages[color]}
              alt={`${color} piece`}
              className="w-full h-full object-contain"
            />
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
        <span className="text-4xl flex justify-center items-center text-yellow-500 font-bold">*</span>
      </div>
    ));
  };

  return (
    <div className="relative grid grid-cols-15 grid-rows-15 w-[600px] h-[600px] border-4 border-black">
      {renderGrid()}
      {renderPieces()}
      {renderSafePoints()}
    </div>
  );
};

export default Board;