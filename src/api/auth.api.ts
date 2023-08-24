import {AuthResponse, User} from "../types";

export const login = async (email: string, password: string): Promise<AuthResponse> => new Promise<AuthResponse>(async (resolve, reject) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.status !== 200)
        reject('Check your credentials')

    try {
        const data = await res.json() as AuthResponse
        resolve(data)
    } catch (e) {
        reject('Something went wrong, try again')
    }
})

export const loadMe = async (token: string) => new Promise<User>(async (resolve, reject) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/me`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    if (res.status !== 200)
        reject('Check your credentials')

    try {
        const data = await res.json() as User
        resolve(data)
    } catch (e) {
        reject('Something went wrong, try again')
    }
})

