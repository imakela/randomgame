import React from "react";
const _ = require("lodash");

const Block = props => {
  const blockClassName = i => {
    if (props.selectedBlocks.indexOf(i) >= 0) {
      if (props.bombPositions.indexOf(i) >= 0) {
        return "bombblock";
      }
      return "clickedblock";
    } else if (props.isDone || props.levelDone) {
      return "passiveblock";
    } else {
      return "block";
    }
  };
  let margin = props.isDone || props.levelDone ? 25 : 75;

  return (
    <div className="blocks" style={{ marginBottom: margin }}>
      {_.range(props.blockCount).map(i => (
        <div
          key={i}
          onClick={() => props.selectBlock(i)}
          className={blockClassName(i)}
          style={{
            backgroundColor: props.blockColors[i]
          }}
        >
          {props.bombPositions.indexOf(i) >= 0 &&
            props.isDone && (
              <img
                src={require("../img/skull.png")}
                className="blockimage"
                alt="skullimage"
              />
            )}
          {props.bombPositions.indexOf(i) >= 0 &&
            props.gameMode === "levels" &&
            props.levelDone && (
              <img
                src={require("../img/skull.png")}
                className="blockimage"
                alt="skullimage"
              />
            )}
          {props.selectedBlocks.indexOf(i) >= 0 &&
            props.bombPositions.indexOf(i) < 0 && (
              <img
                src={require("../img/check.png")}
                alt="img of checkmark"
                className="blockimage"
              />
            )}
        </div>
      ))}
    </div>
  );
};

export default Block;
