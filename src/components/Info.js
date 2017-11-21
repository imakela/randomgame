import React from 'react';

const Info = (props) => {
    return (
        <div className="info">
            <img src={require('../img/info3.png')} alt='info img'
                 onClick={() => props.showInfo()} className="infoimg"/>
            {props.infoVisible && <div className="modal"><div className="infomodal">
                <span onClick={() => props.showInfo()} className="close">X</span>
                <div>
                   <br />
                   <h2>Random Game</h2>
                   <p>
                       Welcome to Random Game! There are two types of blocks, harmless ones and losing ones which are
                       placed randomly each round.
                   </p>
                   <h3>Practice</h3>
                   <p>
                       In this game mode you can freely choose the number of blocks and losing blocks to try out the game.
                       However, <b>the maximum for total blocks is 100, there always has to be atleast one losing block</b> and obviously,
                       <b> you cannot have more losing blocks than you have total blocks. </b> You also cannot change the settings or the game
                           mode while you're playing, restart before that.
                   </p>
                   <h3>Levels</h3>
                   <p>
                       In levels mode your goal is to <b>click all of the harmless blocks</b> with your odds of doing so decreasing every level.
                       <b> If you choose a losing block, you have to start the level again. </b>
                   </p>
                   <p>Good Luck!</p>
                </div></div></div>
            }
        </div>
    );
};


export default Info