import React, {useEffect, useRef} from 'react'
import Table from "../components/table";
import {useAuth, useGame} from "../context";
import {GameStatus} from "../types";
import CloseIcon from '@mui/icons-material/Close';
import {Stack} from "@mui/material";


const Game: React.FC = () => {
    const gameCtx = useGame()
    const auth = useAuth()
    const interval = useRef<NodeJS.Timer>()
    useEffect(() => {
        if (gameCtx.activeGame?.status === GameStatus.ended_draw || gameCtx.activeGame?.status === GameStatus.ended_win) {
            return;
        }
        interval.current = setInterval(() => {
            if (gameCtx.activeGame?.status === GameStatus.ended_draw || gameCtx.activeGame?.status === GameStatus.ended_win) {
                clearInterval(interval.current)
                return
            }
            if (gameCtx.activeGame)
                gameCtx.refreshActiveGame(gameCtx.activeGame).catch(console.error)
        }, 1000)
        return () => {
            clearInterval(interval.current)
        }
    }, [])

    let msg = (
        <span>Game #{gameCtx.activeGame?.id} | {
            gameCtx.getIsMyTurn() ? 'your turn to move' : 'wait for opponent to move'
        }
        </span>
    )

    if (gameCtx.activeGame?.status === GameStatus.ended_draw) {
        msg = (
            <span>Game #{gameCtx.activeGame?.id} | ended as draw</span>
        )
    }

    if (gameCtx.activeGame?.status === GameStatus.ended_win) {
        msg = (
            <span>Game #{gameCtx.activeGame?.id} | {
                gameCtx.activeGame.winnerId === auth.user?.id ? 'you won the game' : 'won by opponent'
            }</span>
        )
    }
    return (
        <div>
            <Stack direction='row' gap='10px' padding='10px'>
                <CloseIcon onClick={gameCtx.closeGame}/>
                {msg}
            </Stack>

            <Table/>
        </div>
    )
}

export default Game