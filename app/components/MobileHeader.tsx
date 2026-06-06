"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "../context/CartContext"
import { useUser, UserButton } from "@clerk/nextjs"

export default function MobileHeader() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { cartCount } = useCart()
    const {isSignedIn } = useUser()


    return (
        <div className="md:hidden">

            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <Link href="/" className="text-sm font-medium">
                Get Right With Uncle John
                </Link>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-2x1 leading-none"
                    >
                        {menuOpen ? "x" : "☰"}
                    </button>
            </div>

            {/* Slide-out menu */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 flex">

                    {/* Dark overlay behind the menu/*}
                    <div
                        className="fixed inset-0 bg-black/40"
                        onClick={() => setMenuOpen(false)}
                    />

                    {/* The menu itself */}
                    <div className="relative z-50 w-64 bg-white min-h-screen flex flex-col px-4 py-6 gap-2 shadow-lg">

                        <p className="text-sm font-medium leading-sung mb-4 pb-4 border-b border-gray-200">
                            Get Right With Uncle John
                        </p>

                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-gray-500 hover:text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Home
                        </Link>

                        <Link
                            href="/books"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-gray-500 hover:text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Books
                        </Link>

                        <Link
                            href="/preview"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-gray-500 hover:text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Preview
                        </Link>

                        <Link
                            href="/cart"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-gray-500 hover:text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                            >
                                Cart({cartCount})
                        </Link>

                    {!isSignedIn && (
                        <Link
                            href="/sign-in"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm text-gray-500 hover:text-black px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors mt-auto"
                            >
                                Sign in
                        </Link>
                    )}


                    {isSignedIn &&(
                        <div className="mt-auto flex items-center gap-2 px-3 py-2">
                            <UserButton />
                            <span className="text-xs text-gray-500">My account</span>
                        </div>
                    )}

                    </div>  
                </div>
            )}


        </div>
    )
}