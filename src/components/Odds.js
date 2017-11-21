import React from 'react';

const Odds = (props) => {
    let odds;
    if (props.selectedBlocks.length === 0) {
        odds = (props.numberOfBombs / props.blockCount) * 100;
    } else {
        let nums = props.blockCount - props.selectedBlocks.length;
        odds = (props.numberOfBombs / nums) * 100;
    }
    if(props.isDone) {
        return (
            <div className="odds">
                <p>You lost!</p>
            </div>
        );
    }

    return (
        <div className="odds">
            { props.levelDone ? 
                <p>
                    Nice you did it! Your odds for passing this level were 1:{props.levelTotalOdds}
                </p>
            :
                <p>Your odds of making the wrong choice: <a className="percent">{odds.toFixed(2)}%</a>
                    {odds === 100 && <img src={require('../img/skull.png')} alt='img of skull'  className="skullimage"/>}
                </p>
            }
        </div>
    );
}


export default Odds