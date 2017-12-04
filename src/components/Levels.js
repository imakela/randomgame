import React from "react";

const storageAvailabiliy = () => {
  let test = "test";
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

const Levels = props => {
  let margin;
  if (!props.levelDone && !props.isDone) {
    margin = 84;
  } else if (props.levelDone) {
    margin = 34;
  }
  let disabled;
  let storageActive = storageAvailabiliy();
  if (storageActive) {
    disabled =
      props.level === parseInt(localStorage.getItem("level"), 10)
        ? true
        : false;
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
      {storageActive && (
        <div className="save">
          {props.level !== 1 && (
            <div
              className="savebutton"
              onClick={() =>
                props.saveLevel(props.level, props.tries, props.totalTries)
              }
            >
              <p>Save level</p>
            </div>
          )}
          {localStorage.getItem("level") !== null && (
            <div
              className={disabled ? "disabledsavebutton" : "savebutton"}
              onClick={() => props.loadLevel(props.level)}
            >
              <p>Load level {localStorage.getItem("level")}</p>
            </div>
          )}
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
