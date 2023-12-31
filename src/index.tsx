import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AppState from "./context/app-state";
import CssBaseline from "@mui/material/CssBaseline";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const defaultTheme = createTheme();


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <AppState>
            <ThemeProvider theme={defaultTheme}>
                {/*<Container component="main" maxWidth="xs">*/}
                <CssBaseline/>
                <App/>
                {/*</Container>*/}
            </ThemeProvider>

        </AppState>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
