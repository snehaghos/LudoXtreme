import React from "react";
import "../css/PlayerPanel.css"; 



const PlayerPanel = ({ currentPlayer }) => {
    return (
      <div className="player-panel">
        <h2>Current Turn: {currentPlayer.color.toUpperCase()}</h2>
      </div>
    );
  };
  
export default PlayerPanel;





