import React from 'react';

const NextLevel = (props) => {
    let isMaxLevel = false;
    if(props.level === 21) {
        isMaxLevel = true;
    }

    return (
        <div>
            { !isMaxLevel &&
                <div className="restartbutton" onClick={() => props.updateLevel(props.level + 1) }>
                    <p>Next level</p>
                </div>
            }
            { isMaxLevel &&
                <div>
                    <p>I don't believe this, you lucky punk... <b>You win.</b></p>
                    <div className="restartbutton" onClick={() => props.updateLevel(1) }>
                        <p>Play Again</p>
                    </div>
                </div>
            }
        </div>
    );
}

export default NextLevel