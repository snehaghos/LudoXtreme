import React, { useState } from "react";
import Board from "./components/Board";
import { pieceImages, homePositions, playerPaths, startingPoints, safePoints, escapePaths } from "./components/constants";
import Maindice from "./components/maindice";
import { getNextPlayer } from "./components/helper";

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
  
    const movable = pieces[currentPlayer].some((piece) => {
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
  
    const path = playerPaths[color];
    const escape = escapePaths[color];
    const newPieces = { ...pieces };
    const currentPiece = newPieces[color][selectedPiece.index];
    let moved = false;
  
    
    if (currentPiece.isHome && value === 6) {
      currentPiece.position = startingPoints[color][0]; 
      currentPiece.pathIndex = 0;
      currentPiece.isHome = false;
      moved = true;
    } else if (!currentPiece.isHome && currentPiece.pathIndex !== -1) {
      const nextIndex = currentPiece.pathIndex + value;
  
      if (nextIndex >= path.length) {
        const escapeIndex = nextIndex - path.length;
        if (escapeIndex < escape.length) {
          const nextPosition = escape[escapeIndex];
          currentPiece.pathIndex = path.length + escapeIndex;
          currentPiece.position = nextPosition;
          moved = true;
        } else if (escapeIndex === escape.length) {
          currentPiece.position = null;
          currentPiece.pathIndex = -2;
          moved = true;
        }
      } else {
        const nextPosition = path[nextIndex];
        const isSafe = safePoints.some(
          (point) => point[0] === nextPosition[0] && point[1] === nextPosition[1]
        );
  
        if (!isSafe) {
          for (const [opponentColor, opponentPieces] of Object.entries(newPieces)) {
            if (opponentColor === color) continue;
            opponentPieces.forEach((opponentPiece, oppIndex) => {
              if (
                !opponentPiece.isHome &&
                opponentPiece.pathIndex >= 0 &&
                opponentPiece.position &&
                opponentPiece.position[0] === nextPosition[0] &&
                opponentPiece.position[1] === nextPosition[1]
              ) {
                newPieces[opponentColor][oppIndex] = {
                  position: null,
                  pathIndex: -1,
                  isHome: true,
                };
              }
            });
          }
        }
  
        currentPiece.pathIndex = nextIndex;
        currentPiece.position = nextPosition;
        moved = true;
      }
    }
  
    if (moved) {
      setPieces(newPieces);
  
      const allWon = newPieces[color].every((p) => p.pathIndex === -2);
      if (allWon) {
        alert(`${color.toUpperCase()} wins the game!`);
        return;
      }
  
      if (value !== 6) {
        const next = getNextPlayer(color);
        setCurrentPlayer(next);
      }
    } else {
      const next = getNextPlayer(color);
      setCurrentPlayer(next);
    }
  
    setDiceValue(null);
    setSelectedPiece(null);
    setMovablePieces([]);
  };

  const handlePieceClick = (color, index) => {
    if (color !== currentPlayer || !diceValue) return;

    const isMovable = movablePieces.some(
      (piece) => piece.color === color && piece.index === index
    );

    if (isMovable) {
      setSelectedPiece({ color, index });
      setTimeout(() => handleMove(color, diceValue), 0);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <Board
        pieces={pieces}
        selectedPiece={selectedPiece}
        pieceImages={pieceImages}
        movablePieces={movablePieces}
        handlePieceClick={handlePieceClick}
      />
    <Maindice
  rollDice={rollDice}
  diceValue={diceValue}
  currentPlayer={currentPlayer}
  movablePieces={movablePieces}
  
/>
    </div>
  );
};

export default Game;