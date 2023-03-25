export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    rating_rate: string;
    rating_count: number;
    stock_quant: number;
    price: number;
}

export interface ProductGetRequest {
    count: number;
    next: string | undefined;
    previous: string | undefined;
    results: Product[]  
}

export interface TokenPostRequest {
    access: string;
    refresh: string;
}

export interface User {
    cpf: string;
    email: string;
    full_name: string;
    address: string;
}

