import { ApplicationStatus } from "../../constants/enums";
import { UserDTO } from "../../dataservice/users-and-auth/dto/user.dto";
import { FacilityDTO } from "../facility/facility.dto";
import { ProductDTO } from "../product/product.dto";

export interface ApplicationDTO {
    id: number;
    applicationId: string;
    applicationDate: Date;
    facilityId: number;
    facility?: FacilityDTO;

    studentId: number;
    student?: UserDTO;

    productId:number;
    product?: ProductDTO;

    staartDate: Date;
    endDate: Date;
    status: ApplicationStatus;
}