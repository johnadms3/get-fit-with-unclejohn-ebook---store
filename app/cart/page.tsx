"use client"

import { useState } from "react"
import { useCart } from "../context/CartContext"
import PageLayout from "../components/PageLayout"
import Link from "next/link"
import Image from "next/image"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { getBookById } from "../data/books"

type AppliedDiscount = { 
    code: string
    type: "percent" | "fixed"
    value: number
    description: string
}

export default function CartPage() {

    const { cartItems, removeFromCart, cartTotal } = useCart()
    const [loading, setLoading] = useState(false)
    const [discountCode, setDiscountCode] = useState("")
    const [discount, setDiscount] = useState<AppliedDiscount | null>(null)
    const [discountError, setDiscountError] = useState("")
    const [discountLoading, setDiscountLoading] = useState(false)
    const { isSignedIn } = useUser()
    const router = useRouter()

    const discountedTotal = discount
            ? discount.type === "percent"
            ? cartTotal * (1 - discount.value / 100)
            : Math.max(0, cartTotal - discount.value)
        :cartTotal
    const savings = cartTotal - discountedTotal

    const handleApplyDiscount = async () => {
        if (!discountCode.trim()) return
        setDiscountLoading(true)
        setDiscountError("")
        setDiscount(null)

        try {
            const response = await fetch("/api/discount", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: discountCode }),
            })
            const data = await response.json()

            if (response.ok) {
                setDiscount(data.discount)
                setDiscountError("")
            } else {
                setDiscountError(data.error || "Invalid code")
                setDiscount(null)
            }
        } catch {
            setDiscountError("Something went wrong")
        }
        setDiscountLoading(false)
    }

    const handleRemoveDiscount = () => {
        setDiscount(null)
        setDiscountCode("")
        setDiscountError("")

    }

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
                    })),
                    discountCode: discount?.code || null,
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

                    {cartItems.map((item) => {
                        const book = getBookById(item.id)
                        return (
                        <div
                            key={item.id}
                            className="rounded-x1 p-4 flex items-center justify-between gap-4"
                            style={{ background: "var(--bg-card)", border: "0.5px solid var (--border)" }}
                            >
                            <div className="flex items-center gap-4">
                                {book && (
                                <Image
                                    src="/GetRightWithUncleJohn.jpeg"
                                    alt={item.title}
                                    width={48}
                                    height={64}
                                    className="rounded-lg"
                                    style={{ border: "0.5px solid var(--border)" }}
                                    />
                                )}
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
                    )
                })}

                {/* Discount Code Input */}
                <div
                    className="rounded-x1 p-4"
                    style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
                >
                    <p className="text-sm font-medium mb-3" style={{ color: "var(--text-main)" }}>
                        Have a discount code?
                    </p>

                    {discount ? (
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium" style={{ color: "var(--green" }}>
                                    {discount.code} - {discount.description}
                                </p>
                                <p className="text-xs" style= {{ color: "var(--text-muted" }}>
                                    You&apos;re saving ${savings.toFixed(2)}!
                                </p>
                            </div>
                            <button
                                onClick={handleRemoveDiscount}
                                className="text-xs"
                                style={{ color: "var(--accent)" }}
                            >
                                Remove    
                            </button>
                        </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyDiscount()} 
                        placeholder="Enter code"
                        className="flex-1 text-sm px-3 py-2 rounded-lg outline-none"
                        style={{
                            background: "var(--bg-surface)",
                            border: "0.5px solid var(--border)",
                            color: "var(--text-main)",
                        }} 
                    />
                    <button 
                        onClick={handleApplyDiscount}
                        disabled={discountLoading}
                        className="text-sm px-4 py-2 rounded-lg btn-animate disabled:opacity-50"
                        style={{ background: "var(--gold)", color:"#fff" }}
                    >
                        {discountLoading ? "..." : "Apply"}    
                    </button>
                </div>
            )}
            
            {discountError && (
                    <p className="text-xs mt-2" style={{ color:"var(--accent)" }}>
                        {discountError}
                    </p>
            )}
        </div>

        {/* Totals */}
        <div className="pt-4 flex flex-col gap-2" style={{ borderTop: "0.5px solid var(--border)" }}>

             <div className="flex justify-between items-center">
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>Subtotal</span>
                <span className="text-sm" style={{ color: "var(--text-main)" }}>${cartTotal.toFixed(2)}</span>
             </div>

             {discount && (
                <div className="flex justify-between items-center">
                    <span className="text-sm" style={{ color: "var(--green)" }}>Discount ({discount.code})</span>
                    <span className="text-sm" style={{ color: "var(--green" }}>${savings.toFixed(2)}</span>
                </div>
             )}

             <div className="flex justify-between items-center pt-2" style={{ borderTop: "0.5px solid var(--border)" }}>
                <span className="text-sm font-medium" style={{ color: "var(--text-main)" }}>Total</span>
                <span className="text-sm font-medium" style={{ color: "var(--gold)" }}>
                    ${discountedTotal.toFixed(2)}
                </span>
             </div>
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