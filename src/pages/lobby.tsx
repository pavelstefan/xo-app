import React, {useEffect} from 'react';
import {useGame} from "../context";
import Box from "@mui/material/Box";
import GameCard from "../components/GameCard";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Lobby: React.FC = () => {
    const gameCtx = useGame()

    useEffect(() => {
        gameCtx.loadGames().catch(console.log)
    }, [])

    return (
        <Box sx={{display: "flex", flexWrap: "wrap", gap: 2, width: '100vw', padding: 2}}>
            <Fab color="primary" aria-label="add" onClick={gameCtx.createGame}>
                <AddIcon/>
            </Fab>
            {gameCtx.games.map(game => (
                <GameCard key={game.id} game={game} handleAction={() => gameCtx.playGame(game)}/>)
            )}
        </Box>
    )
}

export default Lobby