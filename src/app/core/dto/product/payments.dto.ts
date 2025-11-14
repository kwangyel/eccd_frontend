import { ERPPaymentMethod, ERPPaymentStatus } from "../../constants/enums";
import { UserDTO } from "../../dataservice/users-and-auth/dto/user.dto";
import { ParentDTO } from "../users/parent.dto";

export interface ERPPaymentDTO {
    id: number;
    isSend: boolean;
    isReceive: boolean;
    paymentDate: Date;
    paymentNumber: string;
    paymentMethod: ERPPaymentMethod;
    paymentStatus: ERPPaymentStatus;
    paymentAmount: number;
    paymentReference?: string;
    parent: ParentDTO;
    parentId: number;
    invoiceId?: number;
}