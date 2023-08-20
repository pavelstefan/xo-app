import React, {createContext, useContext} from 'react'

export interface IGameContext {
}

const context = createContext<IGameContext>({})

const GameContext: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const value: IGameContext = {}
    return (
        <context.Provider value={value}>{children}</context.Provider>
    )
}

export default GameContext

export const useGame = (): IGameContext => useContext<IGameContext>(context)