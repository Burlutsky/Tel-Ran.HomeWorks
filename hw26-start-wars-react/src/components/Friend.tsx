import type {FC} from "react";
import type {HeroInfo} from "../utils/sw-types";

type Props = {
    friend: HeroInfo;
    onClick: () => void;
}

const Friend: FC<Props> = ({friend, onClick}) => {
    return (
        <img
            src={friend.image}
            title={friend.name}
            alt={friend.name}
            className={'friend'}
            onClick={onClick}
        />
    );
};

export default Friend;