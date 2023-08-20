import React from 'react';
import {useAuth} from "./context";
import Auth from "./pages/auth";
import Lobby from "./pages/lobby";

function App() {
    const auth = useAuth()

    if (!auth.token) {
        return <Auth/>
    }

    return <Lobby/>
}

export default App;
