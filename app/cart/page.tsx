"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import Sidebar from "../components/Sidebar"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function CartPage() {

    const { cartItems, removeFromCart, cartTotal } = useCart()
    const [loading, setLoading] = useState(false)
    const { isSignedIn } = useUser()
    const router = useRouter()

    const handleCheckout = async () => {
        if (!isSignedIn) {
            router.push("/sign-in")
            return
        }

        setLoading(true)
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
            })
            const data = await response.json()
            if (data.url) {
                window.location.href = data.url // send customer to stripe
            }
        } catch (error) {
            console.error("Checkout error:", error)
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 px-6 py-8">

                <h1 className="text-x1 font-medium mb-6">Your Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 mb-4">Your cart is empty</p>
                        <Link
                           href="/"
                           className="text-sm bg-black text-whit px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                            Back to store
                            </Link> 
                    </div>
                ) : (
                  <div className="max-w-x1 flex flex-col gap-4">

                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-200 rounded-x1 p-4 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/GetRightWithUncleJohn.jpeg"
                                    alt={item.title}
                                    width={48}
                                    height={64}
                                    className="rounded-lg border border-gray-200"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{item.title}</p>
                                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-xs text-red-400 hover:text-red-600 transition-colors">
                                    Remove
                                    </button>
                            </div>
                        </div>
                    ))}

                    <div className="border-t border-gray-200 pt-4 flex justify-between itemes-center">
                        <span className="text-sm text-gray-500">Total</span>
                        <span className="text-lg font-medium">${cartTotal.toFixed(2)}</span>
                    </div>

                    {!isSignedIn && (
                        <p className="text-xs text-gray-400 text-center">
                            You'll need to sign in before completing your purchase
                        </p>
                    )}

                    <button 
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full bg-black text-white text-sm font-medium py-3 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50">
                            {loading ? "Redirecting to checkout..." : "Proceed to Checkout"}
                            </button>

                  </div> 
                )}

            </main>
        </div>
    )
}