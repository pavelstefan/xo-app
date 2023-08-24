import React from 'react'
import {Game, GameCell, User} from "../types";
import {Stack} from "@mui/material";
import Cell, {CellColor} from "./cell";
import {useAuth, useGame} from "../context";

const tableConfig = [
    [GameCell.A1, GameCell.A2, GameCell.A3],
    [GameCell.B1, GameCell.B2, GameCell.B3],
    [GameCell.C1, GameCell.C2, GameCell.C3],
]

const getCellColor = (cell: GameCell, game: Game, me: User): CellColor => {
    let color = CellColor.NONE;

    for (let move of game.moves) {
        if (move.cell === cell) {
            color = me.id === move.userId ? CellColor.P1 : CellColor.P2;
        }
    }

    return color;
}

const Table: React.FC = () => {
    const gameCtx = useGame()
    const auth = useAuth()

    return (
        <Stack gap={'2px'} width='30rem' height='30rem'>
            {tableConfig.map(line => (
                <div style={{display: 'flex', flexDirection: 'row', gap: '2px', width: '30rem', height: '10rem'}}>
                    {line.map(cell => <Cell color={getCellColor(cell, gameCtx.activeGame!, auth.user!)} onClick={() => {
                        if (gameCtx.getIsMyTurn())
                            gameCtx.selectCell(gameCtx.activeGame!, cell).catch(console.error)
                    }}/>)}
                </div>
            ))}
        </Stack>
    )
}

export default Table