"use client"

import Link from "next/link"
import { useCart } from "../context/CartContext"

export default function Sidebar() {

    const { cartCount } = useCart()

  return (
    <aside className="w-48 min-h-screen border-r border-gray-200 flex flex-col px-4 py-6 gap-2">
      
      <p className="text-sm font-medium leading-snug mb-4 pb-4 border-b border-gray-200">
        Get Fit With Uncle John
      </p>

      <Link href="/" className="text-sm text-gray-500 hover:text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        Home
      </Link>

      <Link href="/books" className="text-sm text-gray-500 hover:text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        Books
      </Link>

      <Link href="/preview" className="text-sm text-gray-500 hover:text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        Preview
      </Link>

      <Link href="/cart" className="text-sm text-gray-500 hover:text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        Cart ({cartCount})
      </Link>

    </aside>
  )
}