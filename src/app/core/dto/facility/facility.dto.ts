import { FacilityStatus } from "../../constants/enums";

export interface FacilityDTO {
    id: number;
    name: string;
    description: string;
    address: string;
    latitude: number;
    longitude: number;
    status: FacilityStatus;
    capacity: number;
    ownerId: number;
    directorId?:number;
}
