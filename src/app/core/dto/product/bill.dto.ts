import { ERPBillStatus } from "../../constants/enums";
import { ProductDTO } from "./product.dto";
import { VendorDTO } from "./vendor.dto";

export interface ERPBillDTO {
    id: number;
    billDate: Date;
    billNumber: string;
    billStatus: ERPBillStatus;
    billAmount: number;
    vendorId: number;
    vendor: VendorDTO;
    billLines: ERPBillLineDTO[];
}

export interface ERPBillLineDTO {
    id: number;
    billId: number;
    productId: number;
    quantity: number;
    price: number;
    totalAmount: number;
    bill: ERPBillDTO;
    product: ProductDTO;
}