"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import PageLayout from "../components/PageLayout"
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
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    items: cartItems.map((item) => ({
                        id: item.id,
                        quantity: item.quantity,
                    }))
                })
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
            <PageLayout>
            <div className="px-4 sm:px-6 py-8 page-enter">

                <h1 className="text-x1 font-medium mb-6" style={{ color: "var(--text-main)" }}>Your Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="mb-4" style={{ color: "var(--text-muted)" }}>Your cart is empty</p>
                        <Link
                           href="/"
                           className="text-sm px-5 py-2.5 rounded-lg transition-colors"
                           style={{ background: "var(--accent)", color: "#fff" }}
                           >
                            Back to store
                            </Link> 
                    </div>
                ) : (
                  <div className="max-w-x1 flex flex-col gap-4">

                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-x1 p-4 flex items-center justify-between gap-4"
                            style={{ background: "var(--bg-card)", border: "0.5px solid var (--border)" }}
                            >
                            <div className="flex items-center gap-4">
                                <Image
                                    src="/GetRightWithUncleJohn.jpeg"
                                    alt={item.title}
                                    width={48}
                                    height={64}
                                    className="rounded-lg"
                                    style={{ border: "0.5px solid var(--border)" }}
                                    />
                                    <div>
                                        <p className="text-sm font-medium" style={{ color: "var(--text-main)" }}>{item.title}</p>
                                        <p className="text-xs" style={{ color: "var(--text-muted)" }}>Qty: {item.quantity}</p>
                                    </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium" style={{ color: "var(--gold)" }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-xs transition-colors"
                                    style={{ color: "var(--accent)" }}
                            >
                                Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="pt-4 flex justify-between itemes-center" style={{ borderTop: "0.5px solid var(--border)" }}>
                        <span className="text-sm" style={{ color: "var(--text-muted)" }}>Total</span>
                        <span className="text-lg font-medium" style={{ color: "var(--gold)" }}>${cartTotal.toFixed(2)}</span>
                    </div>

                    {!isSignedIn && (
                        <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                            You&apos;ll need to sign in before completing your purchase
                        </p>
                    )}

                    <button 
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full text-sm font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
                        style={{ background: "var(--accent)", color: "#fff" }}
                        >
                            {loading ? "Redirecting to checkout..." : isSignedIn ? "Proceed to Checkout" : "Sign in to Checkout"}
                            </button>

                  </div> 
                )}

            </div>
        </PageLayout>
    )
}