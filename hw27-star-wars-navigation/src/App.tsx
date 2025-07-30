import './App.css'
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Main from "./components/Main.tsx";
import { Component } from "react";
import type {PeopleDto} from "./dto/PeopleDto.ts";

type State = {
    page: string;
    personName: string;
    person: PeopleDto | null;
};

class App extends Component<object, State> {
    constructor(props: object) {
        super(props);
        this.state = {
            page: "Home",
            personName: "Loading...",
            person: null,
        };
    }

    componentDidMount() {
        const randomId = Math.floor(Math.random() * 70) + 1;
        fetch(`https://sw-info-api.herokuapp.com/v1/peoples/${randomId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ personName: data.name, person: data });
            })
            .catch(err => {
                console.error("Failed to load random person:", err);
                this.setState({ personName: "Unknown Jedi" });
            });
    }

    changePage = (page: string, person: PeopleDto | null) => {
        this.setState({ page: page, person: person });
    };

    render() {
        console.log(this.state);
        return (
            <>
                <Header changePage={this.changePage} personName={this.state.personName} person={this.state.person} />
                <Main page={this.state.page} person={this.state.person} />
                <Footer />
            </>
        );
    }
}

export default App;
