import { createContext } from 'react'

export const SWContext = createContext({
    mainHero: 'luke',
    setMainHero: (hero: string) => console.log(hero),
})
