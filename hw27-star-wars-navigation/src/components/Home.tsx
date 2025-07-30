import Hero from "./Hero.tsx";
import Gallery from "./Gallery.tsx";
import FarGalaxy from "./far-galaxy/FarGalaxy.tsx";
import type {FC} from "react";
import type {PeopleDto} from "../dto/PeopleDto.ts";

type Props = {
    person: PeopleDto | null;
}

const Home: FC<Props> = ({person}) => {
    return (
        <main>
            <Hero person={person} />
            <Gallery />
            <FarGalaxy person={person} />
        </main>
    );
};

export default Home;