import Navigation from "./navigation/Navigation.tsx";
import type {FC} from "react";
import type {PeopleDto} from "../dto/PeopleDto.ts";
type Props = {
    changePage: (page: string, person: PeopleDto | null) => void;
    personName: string;
    person: PeopleDto | null;
}

const Header:FC<Props> = ({changePage, personName, person}) => {
    return (
        <header>
            <Navigation changePage={changePage} personName={personName} person={person}/>
            <h1>{personName}</h1>
        </header>
    );
};

export default Header;