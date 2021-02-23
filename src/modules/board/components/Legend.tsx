import React from 'react'

export const renderColorfulLegendText = (value, entry) => {
    const { color } = entry;
    return <span style={{ color }}>{`${value.toString().toUpperCase()}` }</span>;
}


