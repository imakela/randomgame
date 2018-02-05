import React from "react";
import Cookies from "js-cookie";

const Levels = props => {
  let margin;
  if (!props.levelDone && !props.isDone) {
    margin = 84;
  } else if (props.levelDone) {
    margin = 34;
  }
  let disabled;
  let storageActive = navigator.cookieEnabled;
  if (storageActive) {
    disabled =
      props.level === parseInt(Cookies.get("level"), 10) ? true : false;
  }
  return (
    <div style={{ marginBottom: margin }}>
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
          {Cookies.get("level") !== undefined && (
            <div
              className={disabled ? "disabledsavebutton" : "savebutton"}
              onClick={() => props.loadLevel(props.level)}
            >
              <p>Load level {Cookies.get("level")}</p>
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
