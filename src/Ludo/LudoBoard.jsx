import React, { useState } from "react";
import Dice from "./components/Dice";


const ludoPaths = {
  red: {
    startingPoint: [2, 7],
    path: [
      [2,7], [3,7], [4,7], [5,7], [6,7], [7,7], [7,6], [6,7], [1,7], [1,8], [1,9],
      [2,9], [3,9], [4,9], [5,9], [6,9], [7,9], [7,10], [7,11], [7,12], [7,13], [7,14], [7,15],
      [8,15], [9,15], [9,14], [9,13], [9,12], [9,11], [9,10], [10,9], [11,9], [12,9], [13,9], [14,9], [15,9],
      [15,8], [15,7], [14,7], [13,7], [12,7], [11,7], [10,7], [9,7], [9,6], [9,5], [9,4], [9,3], [9,2], [9,1],
      [8,1], [7,1], [7,2], [7,3], [7,4], [7,5], [7,6], [6,7]
    ]
  },
  green: {
    startingPoint: [9, 2],
    path: [
      [9,2], [9,3], [9,4], [9,5], [9,6], [9,7], [8,7], [9,7], [9,8], [9,9], [9,10],
      [8,9], [7,9], [6,9], [5,9], [4,9], [3,9], [2,9], [1,9], [1,10], [1,11], [1,12], [1,13], [1,14], [1,15],
      [2,15], [3,15], [4,15], [5,15], [6,15], [7,15], [8,15], [9,15], [10,15], [11,15], [12,15], [13,15], [14,15], [15,15],
      [15,14], [15,13], [15,12], [15,11], [15,10], [15,9], [14,9], [13,9], [12,9], [11,9], [10,9], [9,9], [9,8], [9,7],
      [10,7], [11,7], [12,7], [13,7], [14,7], [15,7], [15,6], [15,5], [15,4], [15,3], [15,2], [15,1],
      [14,1], [13,1], [12,1], [11,1], [10,1], [9,1], [9,2]
    ]
  },
  blue: {
    startingPoint: [14, 7],
    path: [
      [14,7], [13,7], [12,7], [11,7], [10,7], [9,7], [9,8], [10,7], [9,7], [9,6], [9,5],
      [10,5], [11,5], [12,5], [13,5], [14,5], [15,5], [15,4], [15,3], [15,2], [15,1], [14,1], [13,1], [12,1], [11,1], [10,1], [9,1],
      [8,1], [7,1], [6,1], [5,1], [4,1], [3,1], [2,1], [1,1], [1,2], [1,3], [1,4], [1,5], [1,6], [1,7],
      [2,7], [3,7], [4,7], [5,7], [6,7], [7,7], [8,7], [9,7], [10,7], [11,7], [12,7], [13,7], [14,7]
    ]
  },
  yellow: {
    startingPoint: [7, 14],
    path: [
      [7,14], [7,13], [7,12], [7,11], [7,10], [7,9], [8,9], [7,9], [7,8], [7,7], [7,6],
      [6,7], [5,7], [4,7], [3,7], [2,7], [1,7], [1,6], [1,5], [1,4], [1,3], [1,2], [1,1],
      [2,1], [3,1], [4,1], [5,1], [6,1], [7,1], [8,1], [9,1], [10,1], [11,1], [12,1], [13,1], [14,1], [15,1],
      [15,2], [15,3], [15,4], [15,5], [15,6], [15,7], [14,7], [13,7], [12,7], [11,7], [10,7], [9,7], [9,8], [9,9],
      [8,9], [7,9], [6,9], [5,9], [4,9], [3,9], [2,9], [1,9], [1,10], [1,11], [1,12], [1,13], [1,14], [1,15],
      [2,15], [3,15], [4,15], [5,15], [6,15], [7,15], [8,15], [9,15], [10,15], [11,15], [12,15], [13,15], [14,15], [15,15],
      [15,14], [15,13], [15,12], [15,11], [15,10], [15,9], [14,9], [13,9], [12,9], [11,9], [10,9], [9,9], [9,10], [9,11],
      [8,11], [7,11], [7,12], [7,13], [7,14]
    ]
  },
  safePoints: [
    [3,7], [7,13], [13,9], [9,3]
  ]
};

const LudoBoard = () => {
  const pieceImages = {
    red: "/images/redpiece.png",
    green: "/images/greenpiece.png",
    blue: "/images/bluepiece.png",
    yellow: "/images/yellowpiece.png",
  };

  const [pieces, setPieces] = useState({
    red: Array(4).fill({ position: null, isHome: true }),
    green: Array(4).fill({ position: null, isHome: true }),
    blue: Array(4).fill({ position: null, isHome: true }),
    yellow: Array(4).fill({ position: null, isHome: true })
  });
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [diceValue, setDiceValue] = useState(1);
  const [canRoll, setCanRoll] = useState(true);


    // Function to move a piece
    const movePiece = (color, pieceIndex, steps) => {
      const pathConfig = ludoPaths[color];
      const piece = pieces[color][pieceIndex];
      
      // If piece is at home and dice is 6, move to starting point
      if (piece.isHome && diceValue === 6) {
        setPieces(prev => ({
          ...prev,
          [color]: prev[color].map((p, i) => 
            i === pieceIndex ? { ...p, isHome: false, position: pathConfig.startingPoint } : p
          )
        }));
        return;
      }
  
      // If piece is not on board, can't move
      if (piece.isHome) return;
  
      // Find current position in path
      const currentIndex = pathConfig.path.findIndex(pos => 
        pos[0] === piece.position[0] && pos[1] === piece.position[1]
      );
  
      // Calculate new position
      if (currentIndex >= 0) {
        const newIndex = Math.min(currentIndex + steps, pathConfig.path.length - 1);
        const newPosition = pathConfig.path[newIndex];
        
        setPieces(prev => ({
          ...prev,
          [color]: prev[color].map((p, i) => 
            i === pieceIndex ? { ...p, position: newPosition } : p
          )
        }));
      }
    };
  
    // Handle dice roll
    const handleDiceRoll = (value) => {
      if (!canRoll) return;
      setDiceValue(value);
      setCanRoll(false);
      
      // Here you would add logic to determine which piece to move
      // For now, we'll just move the first available piece
      const availablePieces = pieces[currentPlayer].filter(p => 
        !p.isHome || (p.isHome && value === 6)
      );
      
      if (availablePieces.length > 0) {
        movePiece(currentPlayer, 0, value);
      }
      
      // Switch player after move
      setTimeout(() => {
        const players = ['red', 'green', 'blue', 'yellow'];
        const currentIndex = players.indexOf(currentPlayer);
        const nextPlayer = players[(currentIndex + 1) % players.length];
        setCurrentPlayer(nextPlayer);
        setCanRoll(true);
      }, 1000);
    };
  

    const renderPieces = () => {
      return Object.entries(pieces).map(([color, piecesArray]) => 
        piecesArray.map((piece, index) => {
          if (piece.isHome) return null;
          
          const [col, row] = piece.position;
          return (
            <div
              key={`${color}-${index}`}
              className={`absolute w-6 h-6 rounded-full z-20`}
              style={{
                gridColumn: col,
                gridRow: row,
                backgroundColor: color,
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%'
              }}
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
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative grid grid-cols-15 grid-rows-15 w-full max-w-[600px] h-[600px] bg-white shadow-lg">
        
        {/* Escape Paths */}
        <div className="col-start-2 col-end-7 row-start-8 row-end-9 bg-red-500 border border-black z-10"></div>
        <div className="col-start-10 col-end-15 row-start-8 row-end-9 bg-yellow-500 border border-black z-10"></div>
        <div className="col-start-8 col-end-9 row-start-2 row-end-7 bg-green-500 border border-black z-10"></div>
        <div className="col-start-8 col-end-9 row-start-10 row-end-15 bg-blue-500 border border-black z-10"></div>


        {/* safe areas */}
        <div className="col-start-3 row-start-9 bg-blue-500 borde z-10"></div>
        <div className="col-start-7 row-start-3 bg-red-500 border z-10"></div>
        <div className="col-start-13 row-start-7  bg-green-500 border  z-10"></div>
        <div className="col-start-9  row-start-13 bg-yellow-500 border z-10"></div>

        
  

<div className="absolute inset-0 grid grid-cols-15 grid-rows-15 pointer-events-none">
  {[...Array(15 * 15)].map((_, index) => {
    const row = Math.floor(index / 15) + 1; // Calculate row index (1-based)
    const col = (index % 15) + 1; // Calculate column index (1-based)
    return (
      <div
        key={`cell-${index}`}
        className="flex items-center justify-center border border-gray-300 text-xs text-gray-500"
      >
        {`(${row}, ${col})`}
      </div>
    );
  })}
</div>

        {/* Red Home Area */}
        <div className="col-span-6 row-span-6 bg-red-500 border-2 border-black flex justify-center items-center z-10">
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={`red-${i}`} className="relative w-10 h-10 bg-red-200 rounded-full border-4 border-white flex justify-center items-center">
                <img src={pieceImages.red} alt="Red Piece" className="w-8 h-8 object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Red Starting Position */}
        <div className="col-start-2 row-start-7 bg-red-500 border border-black z-10"></div>

        {/* Green Home Area */}
        <div className="col-start-10 col-span-6 row-span-6 bg-green-500 border-2 border-black flex justify-center items-center z-10">
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={`green-${i}`} className="relative w-10 h-10 bg-green-200 rounded-full border-4 border-white flex justify-center items-center">
                <img src={pieceImages.green} alt="Green Piece" className="w-8 h-8 object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Green Starting Position */}
        <div className="col-start-9 row-start-2 bg-green-500 border border-black z-10"></div>

        {/* Blue Home Area */}
        <div className="row-start-10 row-span-6 col-span-6 bg-blue-500 border-2 border-black flex justify-center items-center z-10">
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={`blue-${i}`} className="relative w-10 h-10 bg-blue-200 rounded-full border-4 border-white flex justify-center items-center">
                <img src={pieceImages.blue} alt="Blue Piece" className="w-8 h-8 object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Blue Starting Position */}
        <div className="col-start-7 row-start-14 bg-blue-500 border border-black z-10"></div>

        {/* Yellow Home Area */}
        <div className="row-start-10 col-start-10 row-span-6 col-span-6 bg-yellow-500 border-2 border-black flex justify-center items-center z-10">
          <div className="grid grid-cols-2 grid-rows-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={`yellow-${i}`} className="relative w-10 h-10 bg-yellow-700 rounded-full border-4 border-white flex justify-center items-center">
                <img src={pieceImages.yellow} alt="Yellow Piece" className="w-8 h-8 object-contain" />
              </div>
            ))}
          </div>
        </div>

        {/* Yellow Starting Position */}
        <div className="col-start-14 row-start-9 bg-yellow-500 border border-black z-10"></div>
{renderPieces()}
        {/* Center Area (3x3) */}
        <div className="col-start-7 col-span-3 row-start-7 row-span-3 grid grid-cols-3 grid-rows-3 border-2 border-black z-10">
          <div className="bg-blue-500" />
          <div className="bg-green-500" />
          <div className="bg-blue-500" />
          <div className="bg-red-500" />
          <div className="bg-white flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-black" />
          </div>
          <div className="bg-yellow-500" />
          <div className="bg-green-500" />
          <div className="bg-blue-500" />
          <div className="bg-green-500" />
        </div>
      </div>

      <Dice />
    </div>
  );
};

export default LudoBoard;
