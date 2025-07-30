import type {PeopleDto} from "./PeopleDto.ts";

export type VehicleDto = {
    id: number;
    pilots: PeopleDto[];
    vehicle_class: string;
}