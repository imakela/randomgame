import React from "react";

const Levels = props => {
  let margin;
  if (!props.levelDone && !props.isDone) {
    margin = 84;
  } else if (props.levelDone) {
    margin = 34;
  }
  return (
    <div style={{ marginBottom: margin }}>
      {props.level === 1 && (
        <div>
          <p>Welcome to levels-mode!</p>
          <p>
            Here you will face increasingly worse odds in each level, but I'm
            sure you can finish them all!
          </p>
        </div>
      )}
      <p className="levelnum">Level: {props.level} </p>
      <p className="levelnum">
        {props.bombCount} X{" "}
        <img
          src={require("../img/skull.png")}
          alt="img of skull"
          className="skullimage2"
        />{" "}
      </p>
      <p>
        Tries on this level: {props.tries} & Total tries: {props.totalTries}{" "}
      </p>
      <p>{props.texts[props.level - 1]} </p>
    </div>
  );
};

export default Levels;
