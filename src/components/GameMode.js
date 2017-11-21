import React from 'react';

const GameMode = (props) => {
    let disabled;
    if(props.selectedBlocks.length !== 0) {
        disabled = 'disabled';
    }
    return (
        <div className="gamemode">
            <h3>Game Mode</h3>
            <p> Practice:
                <input type="radio" checked={props.gameMode === 'practice'} 
                       onChange={props.changeGameMode} disabled={disabled} />
            </p>
            <p> Levels:
                <input type="radio" checked={props.gameMode === 'levels'} 
                       onChange={props.changeGameMode} disabled={disabled} />
            </p>
        </div>
    );
};


export default GameMode