import React from "react";

const Maindice = ({ rollDice, diceValue, currentPlayer, movablePieces }) => {
  return (
    <div className="text-center space-y-2">
      <button
        onClick={rollDice}
        className={`px-4 py-2 rounded-md ${
          diceValue && movablePieces.length > 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white"
        }`}
        disabled={diceValue && movablePieces.length > 0}
      >
        {diceValue && movablePieces.length > 0 ? "Select a piece" : "Roll Dice"}
      </button>
      <p>Dice Value: {diceValue}</p>
      <p>
        Current Player: <span className="capitalize">{currentPlayer}</span>
      </p>
    </div>
  );
};

export default Maindice;