import { UserDTO } from "../../dataservice/users-and-auth/dto/user.dto";
import { StudentDTO } from "./student.dto";
import { UserAuthDTO } from "./userauth.dto";

export interface ParentDTO {
    id: number;
    userId: number;
    user: UserDTO;
    students?: StudentDTO[];
}