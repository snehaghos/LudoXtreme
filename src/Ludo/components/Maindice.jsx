import React from "react";

const Maindice = ({ rollDice, diceValue, currentPlayer, movablePieces }) => {
  const dicePositions = {
    red: { top: "10%", left: "10%" },
    green: { top: "10%", right: "10%" },
    yellow: { bottom: "10%", right: "10%" },
    blue: { bottom: "10%", left: "10%" },
  };

  const diceStyle = dicePositions[currentPlayer] || {};

  return (
    <div
      className="absolute w-20 h-20 flex items-center justify-center bg-white border-2 border-black rounded-full shadow-lg"
      style={{
        ...diceStyle,
        position: "absolute",
      }}
    >
      <button
        onClick={rollDice}
        className={`w-full h-full rounded-full ${
          diceValue && movablePieces.length > 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 text-white"
        }`}
        disabled={diceValue && movablePieces.length > 0}
      >
        {diceValue || "Roll"}
      </button>
    </div>
  );
};

export default Maindice;