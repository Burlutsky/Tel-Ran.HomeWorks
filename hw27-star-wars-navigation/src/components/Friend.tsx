import type {HeroInfo} from "../utils/sw-types";
import type {FC} from "react";

type Props = {
    friend: HeroInfo,
    chooseFriend: (friend: HeroInfo) => void,
    index?:number,
    size?:string
}

const Friend:FC<Props> = ({friend, size, chooseFriend, index}) => {

    const getStyle =  () => {
        if(index === 6) return {borderRadius : "0 0 10px 0"}
        if(index === 8) return {borderRadius : "0 0 0 10px"}
        return {borderRadius : "0"}
    }

    return <img src={friend.img} alt={friend.name}
                style={size? {width:"100%", borderRadius: "0 0 10px 10px"} : getStyle()}
                onClick={() => chooseFriend(friend)}
    />
};

export default Friend;