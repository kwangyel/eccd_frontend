import { ERPInvoiceStatus } from "../../constants/enums";
import { CustomerDTO } from "./customer.dto";
import { ProductDTO } from "./product.dto";

export interface ERPInvoiceDTO {
    id: number;
    invoiceDate: Date;
    invoiceNumber: string;
    invoiceStatus: ERPInvoiceStatus;
    dueDate: Date;
    totalAmount: number;
    customerId: number;
    customer: CustomerDTO;
    invoiceLines: ERPInvoiceLineDTO[];
    JournalEntries: JournalEntryDTO[];
}

export interface ERPInvoiceLineDTO{
    id: number;
    invoiceId: number;
    productId: number;
    quantity: number;
    price: number;
    totalAmount: number;
    invoice: ERPInvoiceDTO;
    product: ProductDTO;
}

export interface JournalEntryDTO{
    id: number;
    invoiceId: number;
    invoice: ERPInvoiceDTO;
    label: string;
    creditAmount: number;
    debitAmount: number;
}