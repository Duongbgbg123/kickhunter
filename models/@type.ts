export interface colors {
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
    size: string[];
    color: string;
    quantity : number
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
    addressLine: string;
    number: string;
    country:string
    id: string;
    username: string;
    mobile: string;
    price: number;
    products: ProductType[];
    status: string;
    userId: string;
    email :string
}

