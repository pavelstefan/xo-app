import React from 'react'
import {render, screen} from '@testing-library/react'
import AppState from "../context/app-state";
import App from "../App";
import * as authAPi from '../api/auth.api'
import {act} from "react-dom/test-utils";



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
    })
    it('Test login page', () => {
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
        act((): void => {
            email.dispatchEvent(new KeyboardEvent('user1', {bubbles: true}))
            password.dispatchEvent(new KeyboardEvent('string', {bubbles: true}))
            loginBtn.dispatchEvent(new MouseEvent('click', {bubbles: true}))
        })
        setTimeout(() => {
            const lobby = screen.getByTestId('lobby-page')
            expect(lobby).toBeInTheDocument()
        }, 100)

    })
})