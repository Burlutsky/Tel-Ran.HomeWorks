import UserAvatar from "./UserAvatar.tsx";
import {useContext} from "react";
import {TwitterContext} from "../utils/twitterContext.ts";
import type {ContextValue, Stats} from "../utils/types.ts";


const UserStats = () => {
    const {user, stats, changeName, changeStats, reduceStats}: ContextValue = useContext(TwitterContext)

    const handleClick = (e: React.MouseEvent<HTMLDivElement>, key: keyof Stats) => {
        if (e.type === 'click') {
            changeStats(key);
        } else if (e.type === 'contextmenu') {
            e.preventDefault();
            reduceStats(key);
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