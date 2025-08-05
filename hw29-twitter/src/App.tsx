import './App.css'
import {useState} from "react";
import type {Stats, User} from "./utils/types";
import Nav from "./components/Nav.tsx";
import Body from "./components/Body.tsx";
import {TwitterContext} from "./utils/twitterContext.ts";

function App() {
    const [user, setUser] = useState<User>({
        name: "User",
        avatar: "https://png.pngtree.com/png-clipart/20211121/original/pngtree-funny-avatar-vector-icons-png-png-image_6948004.png"
    });
    const [stats, setStats] = useState<Stats>({
        followers: 0,
        subscribers: 0
    })

    const changeName = (name: string) => {
        setUser({...user, name: name || user.name})
    }
    const changeAvatar = (url: string) => {
        setUser({...user, avatar: url || user.avatar})
    }

    const changeStats = (key: keyof Stats) => {
        setStats(prev => ({...prev, [key]: prev[key] + 1}))
    }

    const reduceStats = (key: keyof Stats) => {
        setStats(prev => {
            if (prev[key] > 0) return {...prev, [key]: prev[key] - 1};
            return prev;
        })
    }

    return (
        <>
            <TwitterContext.Provider value={{
                user: user,
                stats: stats,
                changeAvatar: changeAvatar,
                changeName: changeName,
                changeStats,
                reduceStats
            }}>
                <Nav/>
                <Body/>
            </TwitterContext.Provider>
        </>
    )
}

export default App
