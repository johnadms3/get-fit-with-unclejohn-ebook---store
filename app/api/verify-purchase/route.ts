import Stripe from "stripe"
import { auth, currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET() {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ purchased: false })
        }

        const user = await currentUser()
        const email = user?.emailAddresses?.[0]?.emailAddress

        if(!email) {
            return NextResponse.json({ purchased: false })
        }

        // Check Stripe for completed payments with this email
        const sessions = await stripe.checkout.sessions.list({
            limit: 100,
            customer_details: { email },
        })

        const hasPurchased = sessions.data.some(
            (s) => s.payment_status === "paid"
        )

        return NextResponse.json({ purchased: hasPurchased })

    } catch (error) {
        console.error("Verify purchase error:", error)
        return NextResponse.json({ purchased: false })
    }
}