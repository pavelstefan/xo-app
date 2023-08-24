import React from 'react'

export enum CellColor {
    P1 = '#76e376',
    P2 = '#4cbfe2',
    NONE = '#d5d5d5'
}

interface ICell {
    color: CellColor;
    onClick: () => void;
}

const Cell: React.FC<ICell> = ({color, onClick}) => {
    return (
        <div onClick={onClick}
             style={{
                 flex: 1,
                 backgroundColor: color,
                 boxSizing: 'border-box',
             }}
        />
    )
}

export default Cell