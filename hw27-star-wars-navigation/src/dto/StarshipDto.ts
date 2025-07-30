import type {PeopleDto} from "./PeopleDto.ts";

export type StarshipDto = {
    hyperdrive_rating: string;
    id: number;
    mglt: string;
    pilots: PeopleDto[];
    starship_class: string;
}