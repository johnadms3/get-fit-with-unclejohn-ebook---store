import Stripe from "stripe"
import { NextResponse, NextRequest } from "next/server"
import { getAllBooks } from "../../data/books"
import { validateDiscount } from "../../data/discounts"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
    try {

        const body = await req.json()
        const { items, discountCode } = body

        const allBooks = getAllBooks()

        const line_items = items.map((item: { id: string; quantity: number}) =>{
            const book = allBooks.find((b) => b.id === item.id)
            if (!book) throw new Error(`Book not found: ${item.id}`)
            return {
                price_data: {
                    currency:"usd",
                    product_data: {
                        name: book.title,
                        description: "Digital download - instant access"
                    },
                    unit_amount: Math.round(book.price * 100),
                },
                quantity: item.quantity,
            }
        })

        // Apply discount if a valid code was provided
        const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = []

        if(discountCode) {
            const discount = validateDiscount(discountCode)
            if (discount) {
                // Create a Stripe coupon on the fly
                const coupon = await stripe.coupons.create(
                    discount.type === "percent"
                    ? { percent_off: discount.value, duration: "once" }
                    : { amount_off: discount.value * 100, currency:"usd", duration: "once" }
                )
                discounts.push({ coupon:coupon.id })
            }
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
        })

        return NextResponse.json({ url: session.url })

    } catch (error) {
        console.error("Stripe error:", error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}