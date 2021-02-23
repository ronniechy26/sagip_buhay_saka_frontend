import React from 'react'

const CustomizedAxisTick = (props) => {
    const {x, y, stroke, payload} = props;
    return (
          <g transform={`translate(${x},${y})`}>
            <text 
                style={{ fontSize :'12px', fontFamily : 'Montserrat'}}
                x={0}
                y={0} 
                dy={16} 
                textAnchor="end" 
                fill="gray" 
                transform="rotate(-35)"
            >
                {payload.value}
            </text>
        </g>
      );
}

export default CustomizedAxisTick
