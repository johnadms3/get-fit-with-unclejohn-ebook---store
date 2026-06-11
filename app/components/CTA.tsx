"use client"

import Link from "next/link"
import { useCart } from "../context/CartContext"
import { useRouter } from "next/navigation"
import { getAllBooks } from "../data/books"

export default function CTA() {

    const { addToCart } = useCart()
    const router = useRouter()
    const book = getAllBooks()[0]

    const handleBuyNow = () => {
        addToCart({
            id: book.id,
            title: book.title,
            price: book.price,
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
        {book.description}
      </p>

      <div className="flex justify-center gap-3 flex-wrap mb-5">
        {book.badges.map((badge) => (
           <span 
            key={badge}
            className="text-xs px-3 py-1 rounded-lg font-medium"
            style={{ background: "var(--gold-bg)", color: "var(--gold-text)" }}
            >
          {badge}
        </span>
        ))}
      </div>

      <div className="flex justify-center items-center gap-3 flex-wrap">
        <button 
          onClick = {handleBuyNow}
          className="text-sm font-medium px-7 py-3 rounded-lg btn-animate"
          style={{ background: "var(--accent)", color: "#fff" }}
          >
          Buy Now — ${book.price}
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