import type {PeopleDto} from "../../dto/PeopleDto.ts";
import type {FC} from "react";
import './FarGalaxy.css';

type Props = {
    person: PeopleDto | null;
};

const FarGalaxy: FC<Props> = ({ person }) => {
    return (
        <p className="farGalaxy">
            Name: <br /><span>{person?.name || "Loading..."}</span><br />
            Birth year: <br /><span>{person?.birth_year || "unknown"}</span><br />
            Gender: <br /><span>{person?.gender || "unknown"}</span><br />
            Eye color: <br /><span>{person?.eye_color || "unknown"}</span><br />
            Skin Color: <br /><span>{person?.skin_color || "unknown"}</span><br />
            Mass: <br /><span>{person?.mass || "unknown"}</span><br />
            Height: <br /><span>{person?.height || "unknown"}</span><br />
        </p>
    );
};

export default FarGalaxy;
