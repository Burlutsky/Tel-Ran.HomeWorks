import {useContext} from "react";
import {TwitterContext} from "../utils/twitterContext.ts";

const UserAvatar = () => {
    const {user, changeAvatar} = useContext(TwitterContext)
    return (
        <div>
            <img src={user.avatar} alt={user.name} className={'user-avatar'}
                 onClick={() => changeAvatar(prompt('Enter new avatar url') as string)}
            />
        </div>
    );
};

export default UserAvatar;