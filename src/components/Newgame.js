import React from "react";

const Newgame = props => {
  return (
    <div>
      {props.gameMode === "practice" && (
        <div onClick={props.initState} className="restartbutton">
          <p>New Game</p>
        </div>
      )}
      {props.gameMode === "levels" && (
        <div onClick={props.initState} className="restartbutton">
          <p>Try again</p>
        </div>
      )}
    </div>
  );
};

export default Newgame;
