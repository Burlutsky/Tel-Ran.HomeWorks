import Friend from "./Friend.tsx";
import info from '../config/sw-config.json';
import type {HeroInfo} from "../utils/sw-types";
import {Component} from "react";
import './Gallery.css';


type State = {
    activeFriend: HeroInfo | null;
};


class Gallery extends Component<object, State>{
    state: State = {
        activeFriend: null
    };

    handleClick = (friend: HeroInfo) => {
        this.setState((prevState) => ({
            activeFriend: prevState.activeFriend?.image === friend.image ? null : friend
        }));
    };
    render() {
        const { activeFriend } = this.state;

        return (
            <section className="right">
                <h3>Dream Team</h3>
                <div className="gallery">
                    {activeFriend ? (
                        <img
                            src={activeFriend.image}
                            alt={activeFriend.name}
                            title={activeFriend.name}
                            className="friend-active"
                            onClick={() => this.setState({ activeFriend: null })}
                        />
                    ) : (
                        info.friends.map((friend) => (
                            <Friend  key={friend.image} onClick={() => this.handleClick(friend)} friend={friend} />
                        ))
                    )}
                </div>
            </section>
        );
    }
}

export default Gallery;