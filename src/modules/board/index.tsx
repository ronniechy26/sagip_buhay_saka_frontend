import React, { Fragment } from 'react';

import Rainfall from './rain_fall/index';
import MinTemp from './min_temp/index';

const Board = () => {
    return (
        <Fragment>
            <div style={scrollDiv}>
                <Rainfall/>  
                <MinTemp/>  
            </div>
        </Fragment>
    )
}

export default Board

const scrollDiv : React.CSSProperties = {
    overflowY: 'auto', 
    maxHeight: 'calc(100vh - 100px)',
    boxSizing: "border-box"
}