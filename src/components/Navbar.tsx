import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-4">
      <div className="container max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-lg font-bold">Shopping Cart</span>
        <div>
          <Link href="/cart" className="mr-4">Cart</Link>
          <Link href="/">Products</Link>
        </div>
      </div>
    </nav>
  );
}