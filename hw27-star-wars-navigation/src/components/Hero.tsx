import type {PeopleDto} from "../dto/PeopleDto.ts";
import type {FC} from "react";

type Props = {
    person: PeopleDto | null
}

const Hero: FC<Props> = ({person}) => {
    return (
        <section className="left">
            {
                person&& <img src={"https://sw-info-api.herokuapp.com/" + person.image} alt={person.name}/>
            }
        </section>
    );
};

export default Hero;