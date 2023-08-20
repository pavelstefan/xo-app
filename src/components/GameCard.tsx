import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Game, GameStatus} from "../types";

export interface IGameCard {
    game: Game;
    handleAction: () => void;
}

const GameCard: React.FC<IGameCard> = ({game, handleAction}) => {
    return (
        <Card sx={{minWidth: 275}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Game #{game.id}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                    {game.status}
                </Typography>
            </CardContent>
            <CardActions>
                <Button onClick={handleAction}
                        size="small">{game.status === GameStatus.open ? 'Join Game' : 'Open Game'}</Button>
            </CardActions>
        </Card>
    )
}

export default GameCard