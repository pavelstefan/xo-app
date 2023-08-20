import React, {createContext, useContext, useState} from 'react'
import {Game, GameStatus} from "../types";
import {createGame, joinGame, loadGame, loadGames} from "../api";
import {useAuth} from "./auth.context";

export interface IGameContext {
    isLoading?: boolean;
    games: Game[];
    activeGame?: Game;
    loadGames: () => Promise<void>
    playGame: (game: Game) => Promise<void>;
    error?: string;
    createGame: () => Promise<void>
}

const context = createContext<IGameContext>({
    isLoading: false,
    games: [],
    loadGames: async () => {
    },
    createGame: async () => {
    },
    playGame: async (_game: Game) => {
    }
})

const GameContext: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [games, setGames] = useState<Game[]>([])
    const [activeGame, setActiveGame] = useState<Game | undefined>()

    const auth = useAuth()
    const handlePlayGame = async (game: Game) => {
        try {
            setError('')
            setIsLoading(true)

            if (game.status === GameStatus.open) {
                if (!auth.token) {
                    setError('Please login')
                    setIsLoading(false)
                    return
                }
                setActiveGame(await joinGame(auth.token, game.id))
            } else {
                setActiveGame(await loadGame(game.id))
            }

        } catch (e: unknown) {
            setError(e as string)
        }
        setIsLoading(false)
    }

    const handleCreateGame = async () => {
        try {
            setError('')
            setIsLoading(true)
            if (auth.token) {
                setActiveGame(await createGame(auth.token))
                const data = await loadGames()
                setGames(data)
            }
        } catch (e: unknown) {
            setError(e as string)
        }
        setIsLoading(false)
    }

    const handleLoadGames = async () => {
        try {
            setError('')
            setIsLoading(true)
            const data = await loadGames()
            setGames(data)
        } catch (e: unknown) {
            setError(e as string)
        }
        setIsLoading(false)
    }

    const value: IGameContext = {
        isLoading,
        games,
        activeGame,
        error,
        playGame: handlePlayGame,
        loadGames: handleLoadGames,
        createGame: handleCreateGame
    }
    return (
        <context.Provider value={value}>{children}</context.Provider>
    )
}

export default GameContext

export const useGame = (): IGameContext => useContext<IGameContext>(context)