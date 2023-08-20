import React from "react";
import AuthContext from "./auth.context";
import GameContext from "./game.context";

const AppState: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <AuthContext>
            <GameContext>
                {children}
            </GameContext>
        </AuthContext>
    )
}

export default AppState