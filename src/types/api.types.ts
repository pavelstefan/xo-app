export interface AuthResponse {
    accessToken: string;
}

export interface User {
    createdAt: string;
    id: number;
    email: string;
    passwordHash: string;
    move?: Move[];
    games: Game[];
}

export enum GameStatus {
    open = 'open',
    active = 'active',
    ended_win = 'ended_win',
    ended_draw = 'ended_draw',
}

export interface UsersOnGames {
    createdAt: string;
    user?: User;
    game?: Game;
    userId: number;
    gameId: number;
}

export interface Game {
    createdAt: string;
    id: number;
    users: UsersOnGames[];
    winnerId?: number;
    moves?: Move[]
    playerToMove: number
    status: GameStatus
}

export enum GameCell {
    A1 = 'A1',
    A2 = 'A2',
    A3 = 'A3',
    B1 = 'B1',
    B2 = 'B2',
    B3 = 'B3',
    C1 = 'C1',
    C2 = 'C2',
    C3 = 'C3',
}


export interface Move {
    createdAt: string;
    game?: Game;
    player: unknown;
    userId: number;
    gameId: number;
    cell: GameCell;
}