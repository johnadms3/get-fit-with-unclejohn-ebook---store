"use client"

import Link from "next/link"
import { useCart } from "../context/CartContext"
import { useUser, UserButton } from "@clerk/nextjs"

export default function Sidebar() {

    const { cartCount } = useCart()
    const { isSignedIn }= useUser()

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

      {!isSignedIn &&(
        <Link
        href="/sign-in"
        className="text-sm text-gray-500 hover:hovertext-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors mt-auto">
            Sign in 
        </Link>
      )}

      {isSignedIn && (
        <div className="mt-auto flex items-center gap-2 px-3 py-2">
            <UserButton />
            <span className="text-xs text-gray-500">My account</span>
        </div>
      )}

    </aside>
  )
}