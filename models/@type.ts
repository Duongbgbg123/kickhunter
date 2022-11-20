interface colors {
    color: string;
    image: string;
}

export interface ProductType {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number | undefined;
    vote?: number;
    image: string[];
    size: number[];
    color: string;
}

export interface ProductsOrderType {
    color: string;
    colorText: string;
    id: string;
    image: string;
    introduce: string;
    name: string;
    price: number;
    quantity: number;
    size: number;
}

export interface OrderType {
    city: string;
    date: string;
    district: string;
    fullAddress: string;
    houseNumber: string;
    id: string;
    name: string;
    phone: string;
    price: number;
    products: ProductsOrderType[];
    status: string;
    userId: string;
}
