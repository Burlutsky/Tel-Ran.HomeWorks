import info from '../config/sw-config.json';
import Friend from "./Friend.tsx";
import type {HeroInfo} from "../utils/sw-types";
import {Component} from "react";

type State = {
    friend:HeroInfo | null;
}

class Gallery extends Component<object, State> {

    constructor(props:object) {
        super(props);
        this.state = {friend: null}
    }

    chooseFriend = (choosen:HeroInfo) => {
         this.setState(prev => prev.friend? {friend:null} : {friend:choosen})

    };

    render() {
        return (

            <section className="right">
                <h3>Dream Team</h3>
                <div className="gallery">
                    {(this.state.friend &&
                        <Friend friend={this.state.friend} chooseFriend={this.chooseFriend} size={'big'}/>
                    ) ||
                        info.friends.map((item: HeroInfo, index) =>
                            <Friend key={item.name} friend={item} chooseFriend={this.chooseFriend} index={index}
                            />
                        )
                    }
                </div>
            </section>
        );
    }
}

export default Gallery;