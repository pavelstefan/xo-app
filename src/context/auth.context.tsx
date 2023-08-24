import React, {createContext, useContext, useState} from 'react'
import {loadMe, login} from "../api";
import {User} from "../types";

export interface IAuthContext {
    token?: string;
    login: (email: string, password: string) => Promise<void>;
    isLoading?: boolean;
    error?: string;
    user?: User;
}

const context = createContext<IAuthContext>({
    login: async (_email: string, _password: string) => {
    }
})


const AuthContext: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [token, setToken] = useState<string>('')
    const [user, setUser] = useState<User | undefined>()

    const handleLogin = async (email: string, password: string) => {
        try {
            setError('')
            setIsLoading(true)
            const data = await login(email, password)
            setToken(data.accessToken)
            const user = await loadMe(data.accessToken)
            setUser(user)
        } catch (e: unknown) {
            setError(e as string)
        }
        setIsLoading(false)
    }

    const value: IAuthContext = {
        isLoading,
        token,
        login: handleLogin,
        error,
        user
    }
    return (
        <context.Provider value={value}>{children}</context.Provider>
    )
}

export default AuthContext

export const useAuth = (): IAuthContext => useContext<IAuthContext>(context)