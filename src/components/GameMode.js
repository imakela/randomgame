import React from "react";

const GameMode = props => {
  let disabled = props.selectedBlocks.length !== 0 ? "disabled" : "";
  let mode = props.gameMode === "levels" ? "Practice" : "Levels";
  return (
    <div className="gamemode">
      <button
        disabled={disabled}
        onClick={props.changeGameMode}
        className="custombutton"
      >
        {mode}
      </button>
    </div>
  );
};

export default GameMode;
