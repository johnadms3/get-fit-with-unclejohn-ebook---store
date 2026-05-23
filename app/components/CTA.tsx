"use client"

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
    <section className="py-8 px-6 text-center border-b border-gray-200 bg-white">

      <h2 className="text-lg font-medium mb-2">
        Ready to transform your body?
      </h2>

      <p className="text-sm text-gray-500 mb-5 leading-relaxed">
        A complete fitness plan with multiple training levels,<br />
        exercise videos, and everything you need to get started.
      </p>

      <div className="flex justify-center gap-3 flex-wrap mb-5">
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg">
          Instant download
        </span>
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-lg">
          Beginner friendly
        </span>
      </div>

      <div className="flex justify-center items-center gap-3 flex-wrap">
        <button 
        onClick = {handleBuyNow}
        className="bg-black text-white text-sm font-medium px-7 py-3 rounded-lg hover:bg-gray-800 transition-colors">
          Buy Now — $24.99
        </button>
        <button className="text-sm px-5 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          Preview first
        </button>
      </div>

      <p className="text-xs text-gray-400 mt-4">
        One-time payment — <span className="text-black font-medium">$24.99</span>
      </p>

    </section>
  )
}