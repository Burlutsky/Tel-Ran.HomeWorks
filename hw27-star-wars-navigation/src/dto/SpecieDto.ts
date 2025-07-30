import type {PeopleDto} from "./PeopleDto.ts";

export type SpecieDto = {
    average_height: string;
    average_lifespan: string;
    classification: string;
    created: string;
    designation: string;
    edited: string;
    eye_colors: string;
    hair_colors: string;
    homeworld: number;
    id: number;
    language: string;
    name: string;
    people: PeopleDto[];
    skin_colors: string;
}