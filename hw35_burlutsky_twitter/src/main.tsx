// main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {store} from '@/app/store'
import App from './App'

import '@fontsource-variable/roboto'            // Roboto Flex variable
import '@fontsource/material-symbols-rounded'   // Material Symbols Rounded

import AppThemeProvider from '@/app/providers/ThemeProvider'    // Material 3/RTL provider

import '@/app/i18n'                             // NOTE: import i18n init once here

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <AppThemeProvider>
                <App />
            </AppThemeProvider>
        </Provider>
    </React.StrictMode>,
)
