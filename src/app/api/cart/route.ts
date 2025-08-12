import { products } from "../productsData";
import { ShoppingCart } from "../types";

let cart: ShoppingCart = { products: [] };

export async function GET() {
  return Response.json(cart);
}

export async function POST(request: Request) {
  const { id } = await request.json();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
  }

  const isProductExistedIndex = cart.products.findIndex((p) => p.id === id);

  if(isProductExistedIndex === -1) {
    cart.products.push({ ...product, quantity: 1, totalPrice: product.price }); 
  } else {
    cart.products[isProductExistedIndex].quantity += 1;
    cart.products[isProductExistedIndex].totalPrice += product.price;
  }
  return Response.json(cart);
}

export async function PATCH(request: Request) {
  const { id, quantity } = await request.json();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
  }

  const isProductExistedIndex = cart.products.findIndex((p) => p.id === id);

  cart.products[isProductExistedIndex].quantity = quantity;
  cart.products[isProductExistedIndex].totalPrice = product.price * quantity;

  return Response.json(cart);
}

export async function DELETE(request: Request) {
  const { id } = (await request.json()) as { id: number };
  const index = cart.products.findIndex((p) => p.id === id);

  if (index === -1) {
    return new Response(JSON.stringify({ error: "Product not in cart" }), { status: 404 });
  }

  cart.products.splice(index, 1);
  return Response.json(cart);
}
