"use client"
import Image from "next/image"
import { useCart } from "../context/CartContext"

export default function CartSection(){

    const { addToCart } = useCart()

    const book = {
        id:"get-fit-uncle-john",
        title: "Get Fit With Uncle John",
        price: 24.99,
        quantity: 1
    }

    return (
        <section className="px-6 py-8" style={{ background: "var(--bg-surface)" }}>

            <h2 className="text-base font-medium mb-4" style={{ color: "var(--text-main)" }}>
                Get Your Copy
            </h2>

            <div 
                className="rounded-x1 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
                >

                <div className="flex items-center gap-4">
                    <Image
                        src="/GetRightWithUncleJohn.jpeg"
                        alt="Get Fit With Uncle John"
                        width={52}
                        height={68}
                        className="rounded-lg"
                        style={{ border: "0.5px solid var(--border)" }}
                    />
                        <div>
                            <p className="text-sm font-medium" style={{ color: "var(--text-main)" }}>Get Fit With Uncle John</p>
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Digital download - instant access</p>
                        </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className="text -x1 font medium" style={{ color: "var(--gold)" }}>$24.99</span>
                <button 
                    onClick={() => addToCart(book)}
                    className="text-sm px-5 py-2.5 rounded-lg transition-colors"
                    style={{ background: "var(--accent)", color: "#fff" }}
                    >
                    Add to cart
                </button>
            </div>

        </section>
    )
}