import React from 'react';

const Settings = (props) => {
    let isDisabled = null;
    if(props.selectedBlocks.length !== 0) {
        isDisabled = 'disabled';
    }
    let margin;
    if(props.selectedBlocks.length === 0) {
        margin = 84;
    } else if(props.isDone) {
        margin = 10;
    } 
    else {
        margin = 18;
    }

    return (
        <div className="settings" style={{marginBottom: margin}}>
            <p>Number of blocks:
            <input type="number" min={props.bombCount} max="100" 
                    value={props.blockCount} onChange={(e) => props.setBlockCount(e)} disabled={isDisabled}
                    onKeyDown={(e) => e.preventDefault() } />
            </p>
            <p>Number of losing blocks:
            <input type="number" min="1" max={props.blockCount} 
                    value={props.bombCount} onChange={(e) => props.setBombCount(e)} disabled={isDisabled} 
                    onKeyDown={(e) => e.preventDefault() } />
            </p>
            {(props.selectedBlocks.length > 0  && !props.isDone) &&
                <div onClick={props.initState} className="restartbutton"><p>Restart</p></div>}
        </div>
    );
    

}

export default Settings