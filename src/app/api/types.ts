export type Product = {
    id: number;
    name: string;
    price: number;
}

export type CartProduct = Product & {
    quantity: number;
    totalPrice: number;
}

export type ShoppingCart = {
    products: CartProduct[];
}