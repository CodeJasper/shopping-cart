export type Product = {
    id: number;
    name: string;
    price: number;
}

export type Cart = {
    products: Product[];
}