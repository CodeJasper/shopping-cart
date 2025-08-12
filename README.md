# 🛒 Shopping Cart

Shopping cart application built with **Next.js (App Router)** and **TypeScript**, featuring a basic backend with API Routes and a frontend to list products, add them to the cart, and calculate the best product combination based on a given budget.

## 🚀 Technologies Used
- [Next.js 15+](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (styling)
- Next.js API Routes to handle products and cart operations

## 📦 Features
- **Product list** fetched from `/api/products`
- **Add to cart** (`POST /api/cart`)
- **Remove product from cart** (`PATCH /api/cart`)
- **Clear cart** (`DELETE /api/cart`)
- **View cart contents** (`GET /api/cart`)
- **Calculate best combination** of products without exceeding a budget (`findBestCombination`)  
  Implemented using a **Backtracking algorithm** to explore all possible subsets of products and select the one with the highest total price without going over the budget.

## 📂 Project Structure

    app/
     ├─ api/
     │   ├─ products/route.ts     # Products list (GET)
     │   └─ cart/route.ts         # Cart operations (GET, POST, PATCH, DELETE)
     ├─ page.tsx                  # Product list and "Add to cart" button
     ├─ cart/page.tsx             # Cart view
     └─ components/               # Reusable components

## 🔧 Installation & Local Development
1. **Clone the repository**  
   `git clone https://github.com/CodeJasper/shopping-cart.git`  
   `cd shopping-cart`

2. **Install dependencies**  
   `npm install`

3. **Run the development server**  
   `npm run dev`

4. **Open in browser**  
   Go to: [http://localhost:3000](http://localhost:3000)

## ☁️ Deployment on Vercel
This project is ready to be deployed on [Vercel](https://shopping-cart-delta-fawn.vercel.app/):
