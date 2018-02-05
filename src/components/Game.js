import React from "react";
import Cookies from "js-cookie";
import randomHexColor from "random-hex-color";
import "../game.css";
import GameMode from "./GameMode";
import Block from "./Block";
import Newgame from "./Newgame";
import Odds from "./Odds";
import Settings from "./Settings";
import Levels from "./Levels";
import Info from "./Info";
import NextLevel from "./NextLevel";
const _ = require("lodash");

const numberOfBlocks = 4;
const numberOfBombs = 1;
const levelTexts = [
  "Lets start with a simple coin flip, 50:50.",
  "1:3 easy.",
  "1:4 still pretty easy.",
  "Now something a bit more interesting.",
  "This is not hard, you can do it!",
  "A few tries and you will get this one.",
  "Lets change it up a bit, only one losing block. Can you dodge it long enough?",
  "This might take a while, but you can do it!",
  "Three bad blocks lurking in here, can you NOT find them?",
  "A first hard one, but give it some time and you will be victorious!",
  "Only three harmless ones in this minefield, can you find them all?",
  "If you manage to get this one right on the first try, you are super lucky...",
  "I'm impressed that you have gotten this far, it's only gonna get harder though...",
  "If you manage to get this one right you truly are a champion.",
  "I'm just gonna say it, your odds of making through this one are veeeeeery slim.",
  "Wow... You truly are remarkable, but if you're not exceptionally lucky your journey will end here...",
  "What is this?? You just might be the luckiest person alive! This level is your reward (haha).",
  "I was pretty sure that no one is ever going to pass that last level," +
    " but if you did I'm sure you want an even bigger challenge, so here you go :)",
  ".... I have no words... Maybe now would be the time to stop playing and go buy yourself a lottery ticket. " +
    "Just kidding, reach for the stars!",
  "You shall not PASS!",
  "No one is ever going to get to this level, but I made it anyway because why not. This is it. The last level." +
    " If you pass this one, you win."
];

const levelConfigs = {
  1: { bombs: 1, blocks: 2 },
  2: { bombs: 2, blocks: 3 },
  3: { bombs: 3, blocks: 4 },
  4: { bombs: 2, blocks: 5 },
  5: { bombs: 2, blocks: 6 },
  6: { bombs: 3, blocks: 6 },
  7: { bombs: 1, blocks: 30 },
  8: { bombs: 3, blocks: 8 },
  9: { bombs: 3, blocks: 10 },
  10: { bombs: 4, blocks: 10 },
  11: { bombs: 13, blocks: 16 },
  12: { bombs: 5, blocks: 12 },
  13: { bombs: 4, blocks: 15 },
  14: { bombs: 3, blocks: 24 },
  15: { bombs: 6, blocks: 15 },
  16: { bombs: 5, blocks: 18 },
  17: { bombs: 3, blocks: 45 },
  18: { bombs: 13, blocks: 19 },
  19: { bombs: 9, blocks: 18 },
  20: { bombs: 4, blocks: 40 },
  21: { bombs: 12, blocks: 21 }
};

const getUniqueIndex = (existingBombs, blockCount) => {
  let bombCandidate = Math.floor(Math.random() * blockCount);
  const isUnique = existingBombs.indexOf(bombCandidate) === -1;
  if (!isUnique) {
    return getUniqueIndex(existingBombs, blockCount);
  }
  return bombCandidate;
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameMode: "levels",
      level: 1,
      tries: 0,
      totalTries: 0,
      levelTotalOdds: 0,
      blockCount: levelConfigs[1].blocks,
      bombPositions: Game.initBombs(numberOfBombs, numberOfBlocks),
      blockColors: Game.randomColor(numberOfBlocks),
      selectedBlocks: [],
      bombCount: levelConfigs[1].bombs,
      isDone: false,
      levelDone: false,
      infoVisible: false
    };
  }

  initState = () => {
    this.setState(prevState => ({
      blockCount: prevState.blockCount,
      bombPositions: Game.initBombs(prevState.bombCount, prevState.blockCount),
      blockColors: Game.randomColor(prevState.blockCount),
      selectedBlocks: [],
      bombCount: prevState.bombCount,
      isDone: false
    }));
  };

  changeGameMode = () => {
    this.setState(
      prevState => ({
        gameMode: prevState.gameMode === "practice" ? "levels" : "practice"
      }),
      this.initLevel(this.state.level)
    );
  };

  updateLevel = level => {
    this.setState({ tries: 0 }, this.initLevel(level));
  };

  initLevel = (level, loadedTries, loadedTotalTries) => {
    const levelBombCount = levelConfigs[level].bombs;
    const levelBlockCount = levelConfigs[level].blocks;
    let levelOdds = 1;
    let singleOdds = 1;
    let d = levelBlockCount;
    let i = 0;
    for (d; levelBombCount < d; d--) {
      singleOdds = 1 - levelBombCount / (levelBlockCount - i);
      levelOdds = levelOdds * singleOdds;
      i++;
    }
    levelOdds = Math.round(1 / levelOdds);
    levelOdds = levelOdds--;
    this.setState(prevState => ({
      level: level,
      levelTotalOdds: levelOdds,
      blockCount: levelBlockCount,
      bombCount: levelBombCount,
      bombPositions: Game.initBombs(levelBombCount, levelBlockCount),
      blockColors: Game.randomColor(levelBlockCount),
      selectedBlocks: [],
      isDone: false,
      levelDone: false,
      tries: loadedTries === undefined ? prevState.tries : loadedTries,
      totalTries:
        loadedTotalTries === undefined ? prevState.totalTries : loadedTotalTries
    }));
  };

  selectBlock = block => {
    const clicked = this.state.selectedBlocks.indexOf(block) >= 0;
    const allowClicking =
      !clicked && !this.state.isDone && !this.state.levelDone;
    if (clicked) {
      return;
    } else if (allowClicking) {
      this.setState(
        prevState => ({
          selectedBlocks: prevState.selectedBlocks.concat(block),
          blockColors: this.changeColor(prevState.blockColors, block)
        }),
        this.updateDoneStatus(block)
      );
    }
  };

  updateDoneStatus = i => {
    if (this.state.bombPositions.indexOf(i) >= 0) {
      this.setState(prevState => ({
        isDone: true,
        tries:
          prevState.gameMode === "levels"
            ? prevState.tries + 1
            : prevState.tries,
        totalTries:
          prevState.gameMode === "levels"
            ? prevState.totalTries + 1
            : prevState.totalTries
      }));
    } else if (
      this.state.gameMode === "levels" &&
      this.state.selectedBlocks.length + 1 + this.state.bombCount ===
        this.state.blockCount
    ) {
      this.setState(prevState => ({
        levelDone: true,
        tries: prevState.tries + 1,
        totalTries: prevState.totalTries + 1
      }));
    }
  };

  changeColor = (arr, i) => {
    if (this.state.bombPositions.indexOf(i) >= 0) {
      arr[i] = "#ff0000";
      return arr;
    }
    arr[i] = "#FFFFFF";
    return arr;
  };

  setBlockCount = e => {
    e.persist();
    if (this.state.selectedBlocks.length === 0) {
      this.setState(prevState => ({
        blockCount: e.target.value,
        blockColors:
          prevState.blockColors.length < e.target.value
            ? prevState.blockColors.concat(Game.randomColor(1))
            : prevState.blockColors.slice(0, -1),
        bombPositions: Game.initBombs(prevState.bombCount, e.target.value)
      }));
    }
  };

  setBombCount = e => {
    e.persist();
    if (this.state.selectedBlocks.length === 0) {
      this.setState(prevState => ({
        bombCount: e.target.value,
        bombPositions: Game.initBombs(e.target.value, prevState.blockCount)
      }));
    }
  };

  showInfo = () => {
    this.setState(prevState => ({
      infoVisible: !prevState.infoVisible
    }));
  };

  static initBombs = (bombCount, blockCount) => {
    return _.range(bombCount).reduce(
      currentBombs =>
        currentBombs.concat(getUniqueIndex(currentBombs, blockCount)),
      []
    );
  };

  static randomColor = num => {
    return _.range(num).map(i => {
      let color = randomHexColor();
      return color;
    });
  };

  saveGame = (level, tries, totalTries) => {
    Cookies.set("level", level, { expires: 365 });
    Cookies.set("tries", tries, { expires: 365 });
    Cookies.set("totaltries", totalTries, { expires: 365 });
    this.setState({ gameMode: "levels" });
  };

  loadGame = level => {
    if (Cookies.get("level") !== undefined) {
      let loadedLevel = parseInt(Cookies.get("level"), 10);
      let loadedTries = parseInt(Cookies.get("tries"), 10);
      let loadedTotalTries = parseInt(Cookies.get("totaltries"), 10);
      if (level === loadedLevel) {
        return;
      }
      this.initLevel(loadedLevel, loadedTries, loadedTotalTries);
    }
  };

  render() {
    return (
      <div className="game">
        <Info infoVisible={this.state.infoVisible} showInfo={this.showInfo} />
        <h1>Random Game</h1>
        <GameMode
          gameMode={this.state.gameMode}
          changeGameMode={this.changeGameMode}
          selectedBlocks={this.state.selectedBlocks}
        />
        {this.state.gameMode === "practice" && (
          <Settings
            gameMode={this.state.gameMode}
            blockCount={this.state.blockCount}
            bombCount={this.state.bombCount}
            setBlockCount={this.setBlockCount}
            setBombCount={this.setBombCount}
            selectedBlocks={this.state.selectedBlocks}
            isDone={this.state.isDone}
            initState={this.initState}
          />
        )}
        {this.state.gameMode === "levels" && (
          <Levels
            level={this.state.level}
            bombCount={this.state.bombCount}
            selectedBlocks={this.state.selectedBlocks}
            isDone={this.state.isDone}
            levelDone={this.state.levelDone}
            texts={levelTexts}
            tries={this.state.tries}
            totalTries={this.state.totalTries}
            saveLevel={this.saveGame}
            loadLevel={this.loadGame}
          />
        )}
        <Odds
          blockCount={this.state.blockCount}
          selectedBlocks={this.state.selectedBlocks}
          isDone={this.state.isDone}
          numberOfBombs={this.state.bombCount}
          levelDone={this.state.levelDone}
          levelTotalOdds={this.state.levelTotalOdds}
        />
        {this.state.isDone && (
          <Newgame initState={this.initState} gameMode={this.state.gameMode} />
        )}
        <br />
        {this.state.levelDone && (
          <NextLevel updateLevel={this.updateLevel} level={this.state.level} />
        )}
        <Block
          blockCount={this.state.blockCount}
          selectedBlocks={this.state.selectedBlocks}
          selectBlock={this.selectBlock}
          blockColors={this.state.blockColors}
          bombPositions={this.state.bombPositions}
          isDone={this.state.isDone}
          levelDone={this.state.levelDone}
          gameMode={this.state.gameMode}
        />
        {this.state.isDone && (
          <Newgame initState={this.initState} gameMode={this.state.gameMode} />
        )}
        {this.state.levelDone &&
          this.state.level !== 21 && (
            <NextLevel
              updateLevel={this.updateLevel}
              level={this.state.level}
            />
          )}
      </div>
    );
  }
}

export default Game;
