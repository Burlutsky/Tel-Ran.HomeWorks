import type {PeopleDto} from "./PeopleDto.ts";
import type {PlanetDto} from "./PlanetDto.ts";
import type {SpecieDto} from "./SpecieDto.ts";
import type {StarshipDto} from "./StarshipDto.ts";
import type {VehicleDto} from "./VehicleDto.ts";

export type FilmDto = {
    characters: PeopleDto[];
    created: string;
    director: string;
    edited: string;
    episode_id: number;
    id: number;
    opening_crawl: string;
    planets: PlanetDto[];
    producer: string;
    release_date: string;
    species: SpecieDto[];
    starships: StarshipDto[];
    title: string;
    vehicles: VehicleDto[];
}