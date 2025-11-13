import { FacilityDTO } from "../facility/facility.dto";
import { ParentDTO } from "./parent.dto";

export interface StudentDTO {
    id: number;
    name: string;
    preferredName: string;
    gender: string;
    dateOfBirth: Date;
    studentCode: string;
    parentId: number;
    parent?: ParentDTO;
    facilityId: number;
    facility?: FacilityDTO;
}