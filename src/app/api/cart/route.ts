import { products } from "../productsData";
import { Cart } from "../types";

let cart: Cart = { products: [] };

export async function GET() {
  return Response.json(cart);
}

export async function POST(request: Request) {
  const { id } = await request.json();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
  }

  cart.products.push(product);
  return Response.json(cart);
}
