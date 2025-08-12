export type Product = {
    id: number;
    name: string;
    price: number;
}

export type ShoppingCart = {
    products: Product[];
}