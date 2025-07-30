import type {FC} from "react";
import Home from "../components/Home.tsx";
import AboutMe from "../components/AboutMe.tsx";
import StarWars from "../components/StarWars.tsx";
import Contact from "../components/contacts/Contact.tsx";
import type {PeopleDto} from "../dto/PeopleDto.ts";

export type PageItem = {
    title: string;
    page: FC;
    person: PeopleDto | null;
};

export const navItems: PageItem[] = [
    { title: "Home", page: Home, person: null },
    { title: "About me", page: AboutMe, person: null },
    { title: "Star Wars", page: StarWars, person: null },
    { title: "Contact", page: Contact, person: null }
];