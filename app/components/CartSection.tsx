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
        <section className="px-6 py-8">

            <h2 className="text-base font-medium mb-4">Get Your Copy</h2>

            <div className="bg-white border border gray-200 rounded-x1 p-5 flex items-center justify-between flex-wrap gap-4">

                <div className="flex items-center gap-4">
                    <Image
                        src="/GetRightWithUncleJohn.jpeg"
                        alt="Get Fit With Uncle John"
                        width={52}
                        height={68}
                        className="rounded-lg border border-gray-200"
                        />
                        <div>
                            <p className="text-sm font-medium>">Get Fit With Uncle John</p>
                            <p className="text-xs text-gray-500">Digital download - instant access</p>
                        </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <span className="text -x1 font medium">$24.99</span>
                <button 
                onClick={() => addToCart(book)}
                className="bg-black text-white text-sm px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors">
                    Add to cart
                </button>
            </div>

        </section>
    )
}