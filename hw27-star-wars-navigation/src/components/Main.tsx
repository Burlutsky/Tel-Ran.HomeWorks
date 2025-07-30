import type {FC} from "react";
import {navItems} from "../constants/navItems.ts";
import type {PeopleDto} from "../dto/PeopleDto.ts";

type Props = {
    page: string
    person: PeopleDto | null;
}

const Main: FC<Props> = ({page, person}) => {
    const match = navItems.find(item => item.title === page);
    const PageComponent:FC<Props> | undefined = match?.page;
    return PageComponent ? <PageComponent person={person} page={page}/> : <div>Page not found</div>;

};

export default Main;