import { ProductType } from "../../constants/enums";

export interface ProductDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    type: ProductType;
    isSale: boolean;
    isPurchase: boolean;
    gst: number;
    unit: string;
    imageUrl?: string;
}