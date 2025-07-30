import type {FC} from "react";
import type {PeopleDto} from "../../dto/PeopleDto.ts";

type Props = {
    text:string;
    changePage: (page:string, person: PeopleDto | null) => void;
    person: PeopleDto | null;
}

const NavItem:FC<Props> = ({text, changePage, person}) => {
    return <li
    onClick={() => {
        changePage(text, person)
    }}
    >{text}</li>
};

export default NavItem;