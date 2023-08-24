import React from 'react'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import AppState from "./context/app-state";
import App from "./App";
import * as authAPi from './api/auth.api'
import * as gameAPI from './api/game.api'


describe('auth page tests', () => {
    beforeEach(() => {
        jest.spyOn(authAPi, 'login').mockReturnValue(Promise.resolve({
            accessToken: 'a-token'
        }));
        jest.spyOn(authAPi, 'loadMe').mockReturnValue(Promise.resolve({
            "createdAt": "2023-08-24T11:33:12.785000+00:00",
            "id": 2,
            "email": "user1",
            "passwordHash": "$2b$12$rugyEepBqlNl.Led98JDeOYiLgMIIBKxtCOM2URClYWSDACWQtbpm",
            "move": [],
            "games": []
        }))
        jest.spyOn(gameAPI, 'loadGames').mockReturnValue(Promise.resolve([]));
    })
    it('Test login page', async () => {
        render(
            <AppState>
                <App/>
            </AppState>
        )

        let page = screen.getByTestId('auth-page')
        expect(page).toBeInTheDocument()
        const email = screen.getByTestId('email')
        const password = screen.getByTestId('password')
        const loginBtn = screen.getByTestId('login-btn')

        expect(email).toBeInTheDocument()
        expect(password).toBeInTheDocument()
        expect(loginBtn).toBeInTheDocument()

        fireEvent.change(email, {target: {value: 'user1'}})
        fireEvent.change(password, {target: {value: 'string'}})
        fireEvent.click(loginBtn)

        await waitFor(() => {
            const lobby = screen.getByTestId('lobby-page')
            expect(lobby).toBeInTheDocument()
        })

    })
})