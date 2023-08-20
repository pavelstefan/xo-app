import {AuthResponse} from "../types";

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
