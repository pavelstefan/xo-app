import {Game, GameCell} from "../types";

export const loadGames = async (): Promise<Game[]> => new Promise<Game[]>(async (resolve, reject) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/game`)
    if (res.status !== 200)
        reject('Something went wrong, try again')

    try {
        const data = await res.json() as Game[]
        resolve(data)
    } catch (e) {
        reject('Something went wrong, try again')
    }
})

export const createGame = async (token: string): Promise<Game> => new Promise<Game>(async (resolve, reject) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/game`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (res.status !== 200)
        reject('Something went wrong, try again')

    try {
        const data = await res.json() as Game
        resolve(data)
    } catch (e) {
        reject('Something went wrong, try again')
    }
})


export const loadGame = async (gameId: number): Promise<Game> => new Promise<Game>(async (resolve, reject) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/game/${gameId}`)
    if (res.status !== 200)
        reject('Something went wrong, try again')

    try {
        const data = await res.json() as Game
        if (!data.moves) {
            data.moves = []
        }
        resolve(data)
    } catch (e) {
        reject('Something went wrong, try again')
    }
})

export const joinGame = async (token: string, gameId: number): Promise<Game> => new Promise<Game>(async (resolve, reject) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/game/${gameId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if (res.status !== 200)
        reject('Something went wrong, try again')

    try {
        const data = await res.json() as Game
        resolve(data)
    } catch (e) {
        reject('Something went wrong, try again')
    }
})

export const sendMove = async (token: string, gameId: number, cell: GameCell): Promise<Game> => new Promise<Game>(async (resolve, reject) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/game/move/${gameId}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cell
        })
    })
    if (res.status !== 200)
        reject('Something went wrong, try again')

    try {
        const data = await res.json() as Game
        resolve(data)
    } catch (e) {
        reject('Something went wrong, try again')
    }
})
