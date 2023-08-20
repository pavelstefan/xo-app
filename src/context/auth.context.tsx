import React, {createContext, useContext, useState} from 'react'
import {login} from "../api";

export interface IAuthContext {
    token?: string;
    login: (email: string, password: string) => Promise<void>
    isLoading?: boolean,
    error?: string
}

const context = createContext<IAuthContext>({
    login: async (email: string, password: string) => {
    }
})


const AuthContext: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [token, setToken] = useState<string>('')

    const handleLogin = async (email: string, password: string) => {
        try {
            setError('')
            setIsLoading(true)
            const data = await login(email, password)
            setToken(data.accessToken)
        } catch (e: unknown) {
            setError(e as string)
        }
        setIsLoading(false)
    }

    const value: IAuthContext = {
        isLoading,
        token,
        login: handleLogin,
        error
    }
    return (
        <context.Provider value={value}>{children}</context.Provider>
    )
}

export default AuthContext

export const useAuth = (): IAuthContext => useContext<IAuthContext>(context)