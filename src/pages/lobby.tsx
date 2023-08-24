import React, {useEffect} from 'react';
import {useAuth, useGame} from "../context";
import Box from "@mui/material/Box";
import GameCard from "../components/GameCard";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Game from "./game";

const Lobby: React.FC = () => {
    const gameCtx = useGame()
    const auth = useAuth()

    useEffect(() => {
        gameCtx.loadGames().catch(console.log)
    }, [])

    if (gameCtx.activeGame) {
        return <Game/>;
    }

    return (
        <Box data-testid='lobby-page' sx={{display: "flex", flexWrap: "wrap", gap: 2, width: '100vw', padding: 2}}>
            <Fab color="primary" aria-label="add" onClick={gameCtx.createGame}>
                <AddIcon/>
            </Fab>
            {gameCtx.games.map(game => (
                <GameCard key={game.id} game={game} handleAction={() => gameCtx.playGame(game)} user={auth.user!}/>)
            )}
        </Box>
    )
}

export default Lobby