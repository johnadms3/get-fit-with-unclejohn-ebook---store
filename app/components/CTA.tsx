"use client"

import Link from "next/link"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/navigation"

export default function CTA() {

    const { addToCart } = useCart()
    const router = useRouter()

    const handleBuyNow = () => {
        addToCart({
            id: "get-fit-uncle-john",
            title: "Get Fit With Uncle John",
            price: 24.99,
            quantity: 1
        })
        router.push("/cart")
    }


  return (
    <section 
        className="py-8 px-6 text-center"
        style={{ background: "var(--bg-card)", borderBottom: "0.5px solid var(--border)" }}
        >

      <h2 className="text-lg font-medium mb-2" style={{ color: "var(--text-main)" }}>
        Ready to transform your body?
      </h2>

      <p className="text-sm mb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>
        A complete fitness plan with multiple training levels,<br />
        exercise videos, and everything you need to get started.
      </p>

      <div className="flex justify-center gap-3 flex-wrap mb-5">
        <span 
          className="text-xs px-3 py-1 rounded-lg font-medium"
          style={{ background: "var(--gold-bg)", color: "var(--gold-text)" }}
        >
          Instant download
        </span>
        <span 
          className="text-xs px-3 py-1 rounded-lg font-medium"
          style={{ background: "var(--red-bg)", color: "var(--red-text)" }}
          >
          Beginner friendly
        </span>
      </div>

      <div className="flex justify-center items-center gap-3 flex-wrap">
        <button 
          onClick = {handleBuyNow}
          className="text-sm font-medium px-7 py-3 rounded-lg btn-animate"
          style={{ background: "var(--accent)", color: "#fff" }}
          >
          Buy Now — $24.99
        </button>
        <Link 
          href="/preview" 
          className="text-sm px-5 py-3 rounded-lg btn-animate"
          style={{ color: "var(--gold)", border: "0.5px solid var(--gold)" }}
          >
          Preview first
        </Link>
      </div>

      <p className="text-xs mt-4" style={{ color: "var(--text-muted)" }}>
        One-time payment — <span className="font-medium" style={{ color: "var(--gold" }}>$24.99</span>
      </p>

    </section>
  )
}