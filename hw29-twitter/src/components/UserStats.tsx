import UserAvatar from "./UserAvatar.tsx";
import {type MouseEvent, useContext} from "react";
import {TwitterContext} from "../utils/twitterContext.ts";
import type {ContextValue, Stats} from "../utils/types.ts";


const UserStats = () => {
    const {user, stats, changeName, changeStats}: ContextValue = useContext(TwitterContext)

    const handleClick = (e: MouseEvent<HTMLDivElement>, key: keyof Stats) => {
        if (e.type === 'click') {
            changeStats(key, 1);
        } else if (e.type === 'contextmenu') {
            e.preventDefault();
            if (stats[key] > 0) changeStats(key, -1);
        }
    };

    return (
        <div className={"user-stats"}>
            <UserAvatar/>
            <p
                onClick={() => changeName(prompt("Enter new nickname") as string)}
            >{user.name}</p>
            <div className={"stats"}>
                <div
                    onClick={(e) => handleClick(e, 'followers')}
                    onContextMenu={(e) => handleClick(e, 'followers')}
                >Followers: {stats.followers}</div>
                <div
                    onClick={(e) => handleClick(e, 'subscribers')}
                    onContextMenu={(e) => handleClick(e, 'subscribers')}
                >Subscribers: {stats.subscribers}</div>
            </div>
        </div>
    );
};

export default UserStats;