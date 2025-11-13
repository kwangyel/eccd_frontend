import { ERPPaymentStatus } from "../../constants/enums";

export interface ERPPaymentDTO {
    id: number;
    isSend: boolean;
    isReceive: boolean;
    paymentDate: Date;
    paymentNumber: string;
    paymentStatus: ERPPaymentStatus;
    paymentAmount: number;
    paymentMethod: string;
    paymentReference: string;
    paymentReferenceNumber: string;
}