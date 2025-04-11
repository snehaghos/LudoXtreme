import React, { useState } from "react";
import redPiece from "/images/redpiece.png";
import greenPiece from "/images/greenpiece.png";
import yellowPiece from "/images/yellowpiece.png";
import bluePiece from "/images/bluepiece.png";
import Board from "./components/Board";

const pieceImages = {
  red: redPiece,
  green: greenPiece,
  yellow: yellowPiece,
  blue: bluePiece,
};

const homePositions = {
  red: [[1, 1], [1, 2], [2, 1], [2, 2]],
  green: [[1, 13], [1, 14], [2, 13], [2, 14]],
  yellow: [[13, 13], [13, 14], [14, 13], [14, 14]],
  blue: [[13, 1], [13, 2], [14, 1], [14, 2]],
};

const playerPaths = {
  red: [
    [6, 0], [6, 1], [6, 2], [6, 3], [6, 4],[6,5], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6], [0, 6],
    [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13],
    [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [9, 8], [10, 8], [11, 8],
    [12, 8], [13, 8], [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [8, 5],
    [8, 4], [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0],
  ],
  green: [
    [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [6, 9], [6, 10], [6, 11], [6, 12], [6, 13], [6, 14],
    [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [9, 8], [10, 8], [11, 8], [12, 8],
    [13, 8], [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [8, 5], [8, 4],
    [8, 3], [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [5, 6],
    [4, 6], [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8],
  ],
  yellow: [
    [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [9, 8], [10, 8], [11, 8], [12, 8], [13, 8],
    [14, 8], [14, 7], [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [8, 5], [8, 4], [8, 3],
    [8, 2], [8, 1], [8, 0], [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [5, 6], [4, 6],
    [3, 6], [2, 6], [1, 6], [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [6, 9],
    [6, 10], [6, 11], [6, 12], [6, 13], [6, 14], [7, 14], [8, 14],
  ],
  blue: [
    [14, 6], [13, 6], [12, 6], [11, 6], [10, 6], [8, 5], [8, 4], [8, 3], [8, 2], [8, 1], [8, 0],
    [7, 0], [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [5, 6], [4, 6], [3, 6], [2, 6], [1, 6],
    [0, 6], [0, 7], [0, 8], [1, 8], [2, 8], [3, 8], [4, 8], [6, 9], [6, 10], [6, 11], [6, 12],
    [6, 13], [6, 14], [7, 14], [8, 14], [8, 13], [8, 12], [8, 11], [8, 10], [9, 8], [10, 8],
    [11, 8], [12, 8], [13, 8], [14, 8], [14, 7], [14, 6],
  ],
};

const startingPoints = {
  red: [6, 1],
  green: [1, 8],
  yellow: [8, 13],
  blue: [13, 6],
};

const Game = () => {
  const [diceValue, setDiceValue] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [pieces, setPieces] = useState({
    red: Array(4).fill(null).map(() => ({ position: null, pathIndex: -1, isHome: true })),
    green: Array(4).fill(null).map(() => ({ position: null, pathIndex: -1, isHome: true })),
    yellow: Array(4).fill(null).map(() => ({ position: null, pathIndex: -1, isHome: true })),
    blue: Array(4).fill(null).map(() => ({ position: null, pathIndex: -1, isHome: true })),
  });
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [movablePieces, setMovablePieces] = useState([]);

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    setSelectedPiece(null); 
 
    calculateMovablePieces(currentPlayer, value);
    
    const movable = pieces[currentPlayer].some((piece, index) => {
      if (value === 6 && piece.isHome) return true;
      if (!piece.isHome) {
        const nextIndex = piece.pathIndex + value;
        return nextIndex < playerPaths[currentPlayer].length;
      }
      return false;
    });
    
    if (!movable && value !== 6) {
      const next = getNextPlayer(currentPlayer);
      setCurrentPlayer(next);
    }
  };
  const calculateMovablePieces = (color, diceValue) => {
    const playerPieces = pieces[color];
    const movable = [];

    if (diceValue === 6) {
      const homePieces = playerPieces
        .map((piece, index) => ({ piece, index }))
        .filter(({ piece }) => piece.isHome);

      if (homePieces.length > 0) {
        movable.push(...homePieces.map(({ index }) => ({ color, index })));
      }
    }

    playerPieces.forEach((piece, index) => {
      if (!piece.isHome && piece.pathIndex !== -1) {
        const nextIndex = piece.pathIndex + diceValue;
        if (nextIndex < playerPaths[color].length) {
          movable.push({ color, index });
        }
      }
    });

    setMovablePieces(movable);
  };


  const handleMove = (color, value) => {
    if (!selectedPiece) return;
  
    const playerPieces = pieces[color];
    const path = playerPaths[color];
    const newPieces = [...playerPieces];
    const piece = newPieces[selectedPiece.index];
    let moved = false;
  
    if (piece.isHome && value === 6) {
      piece.position = startingPoints[color];
      piece.pathIndex = 0;
      piece.isHome = false;
      moved = true;
    }
    else if (!piece.isHome && piece.pathIndex !== -1) {
      const nextIndex = piece.pathIndex + value;
      if (nextIndex < path.length) {
        piece.pathIndex = nextIndex;
        piece.position = path[nextIndex];
        moved = true;
      }
    }
  
    if (moved) {
      setPieces(prev => ({ ...prev, [color]: newPieces }));
  
      if (value !== 6) {
        const next = getNextPlayer(color);
        setCurrentPlayer(next);
        setDiceValue(null);
      } else {
        setDiceValue(null);
      }
    } else {
      const next = getNextPlayer(color);
      setCurrentPlayer(next);
      setDiceValue(null);
    }
  
    setSelectedPiece(null);
    setMovablePieces([]);
  };


  const getNextPlayer = (color) => {
    const order = ["red", "green", "yellow", "blue"];
    const currentIndex = order.indexOf(color);
    return order[(currentIndex + 1) % order.length];
  };

  const renderPieces = () => {
    return Object.entries(pieces).flatMap(([color, playerPieces]) =>
      playerPieces.map((piece, index) => {
        const isSelected = selectedPiece?.color === color && selectedPiece?.index === index;
        const isMovable = movablePieces.some(
          p => p.color === color && p.index === index
        );

        const pieceStyles = {
          gridColumn: piece.isHome ? homePositions[color][index][1] : piece.position[1] + 1,
          gridRow: piece.isHome ? homePositions[color][index][0] : piece.position[0] + 1,
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


  const handlePieceClick = (color, index) => {
    // allow current player to select pieces
    if (color !== currentPlayer || !diceValue) return;

    // if the piece is movable
    const isMovable = movablePieces.some(
      piece => piece.color === color && piece.index === index
    );

    if (isMovable) {
      setSelectedPiece({ color, index });
      //  updates before handleMove
      setTimeout(() => handleMove(color, diceValue), 0);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <Board renderPieces={renderPieces} />

      <div className="text-center space-y-2">
        <button
          onClick={rollDice}
          className={`px-4 py-2 rounded-md ${diceValue && movablePieces.length > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white"
            }`}
          disabled={diceValue && movablePieces.length > 0}
        >
          {diceValue && movablePieces.length > 0 ? "Select a piece" : "Roll Dice"}
        </button>
        <p>Dice Value: {diceValue}</p>
        <p>Current Player: <span className="capitalize">{currentPlayer}</span></p>
      </div>
    </div>
  );
};

export default Game;
