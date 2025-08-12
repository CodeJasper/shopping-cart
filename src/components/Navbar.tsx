export default function Navbar() {
  return (
    <nav className="p-4">
      <div className="container max-w-6xl mx-auto flex justify-between items-center">
        <span className="text-lg font-bold">Shopping Cart</span>
        <div>
          <a href="/cart" className="mr-4">Cart</a>
          <a href="/">Products</a>
        </div>
      </div>
    </nav>
  );
}