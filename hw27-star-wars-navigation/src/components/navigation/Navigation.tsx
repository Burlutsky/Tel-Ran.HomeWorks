import {navItems, type PageItem} from "../../constants/navItems.ts";
import NavItem from "./NavItem.tsx";
import type {FC} from "react";
import type {PeopleDto} from "../../dto/PeopleDto.ts";

type Props = {
    changePage: (page: string, person: PeopleDto | null) => void;
    personName: string;
    person: PeopleDto | null;
}

const Navigation:FC<Props> = ({changePage, person}) => {
    return (
        <nav>
            <ul>
                {
                    navItems.map((item: PageItem) =>
                        <NavItem
                            key={item.title}
                            text={item.title}
                            changePage={changePage}
                            person={person} />
                    )
                }
            </ul>
        </nav>
    );
};

export default Navigation;

