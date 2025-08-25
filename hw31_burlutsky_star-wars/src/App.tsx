import { useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './app/router'
import { SWContext } from './shared/lib/SWContext' // пока файла нет — создадим заглушку ниже
import './App.css'

const App = () => {
    const [mainHero, setMainHero] = useState('luke')
    return (
        <SWContext.Provider value={{ mainHero, setMainHero }}>
            <RouterProvider router={router} />
        </SWContext.Provider>
    )
}
export default App
