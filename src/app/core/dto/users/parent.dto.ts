import { StudentDTO } from "./student.dto";
import { UserAuthDTO } from "./userauth.dto";

export interface ParentDTO {
    id: number;
    userId: number;
    user: UserAuthDTO;
    students?: StudentDTO[];
}