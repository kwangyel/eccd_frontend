import { UserDTO } from "../../dataservice/users-and-auth/dto/user.dto";

export interface CustomerDTO {
    id: number;
    name: string;
    contactNumber: number;
    userId: number;
    user: UserDTO;
}