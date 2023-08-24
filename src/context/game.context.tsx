import React, {createContext, useContext, useState} from 'react'
import {Game, GameCell, GameStatus} from "../types";
import {createGame, joinGame, loadGame, loadGames, sendMove} from "../api";
import {useAuth} from "./auth.context";

export interface IGameContext {
    isLoading?: boolean;
    games: Game[];
    activeGame?: Game;
    loadGames: () => Promise<void>
    playGame: (game: Game) => Promise<void>;
    refreshActiveGame: (game: Game) => Promise<void>;
    error?: string;
    createGame: () => Promise<void>;
    selectCell: (_game: Game, cell: GameCell) => Promise<void>;
    getIsMyTurn: () => boolean;
    closeGame: () => void;
}

const context = createContext<IGameContext>({
    isLoading: false,
    games: [],
    loadGames: async () => {
    },
    createGame: async () => {
    },
    playGame: async (_game: Game) => {
    },
    refreshActiveGame: async (_game: Game) => {
    },
    selectCell: async () => {
    },
    getIsMyTurn: () => false,
    closeGame: () => {
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

    const handleRefreshGame = async (game: Game) => {
        setActiveGame(await loadGame(game.id))
    }

    const handleSendMove = async (game: Game, cell: GameCell) => {
        if (auth.token)
            setActiveGame(await sendMove(auth.token, game.id, cell))
    }

    const getIsMyTurn = (): boolean => {
        if (!activeGame || !auth.user)
            return false

        return auth.user.id === activeGame.playerToMove;
    }

    const closeGame = () => {
        setActiveGame(undefined)
    }

    const value: IGameContext = {
        isLoading,
        games,
        activeGame,
        error,
        playGame: handlePlayGame,
        loadGames: handleLoadGames,
        createGame: handleCreateGame,
        refreshActiveGame: handleRefreshGame,
        selectCell: handleSendMove,
        getIsMyTurn,
        closeGame
    }
    return (
        <context.Provider value={value}>{children}</context.Provider>
    )
}

export default GameContext

export const useGame = (): IGameContext => useContext<IGameContext>(context)