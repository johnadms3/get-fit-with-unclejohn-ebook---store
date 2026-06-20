import Stripe from "stripe"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function GET(){
    try {
        const { userId } = await auth()

        if(userId !== process.env.NEXT_PUBLIC_ADMIN_USER_ID) {
            return NextResponse.json({ error: "Unauthorised" }, { status: 401 })
        }

        // Get recent payment sessions from Stripe
        const sessions = await stripe.checkout.sessions.list({
            limit: 50, 
            expand: ["data.line_items"],
        })

        const completedSales = sessions.data
        .filter((s) => s.payment_status === "paid")
        .map((s) => ({
            id: s.id,
            email: s.customer_details?.email || "Unknown",
            amount: (s.amount_total || 0) / 100,
            date: new Date(s.created * 1000).toLocaleDateString(),
            items: s.line_items?.data.map((item) => item.description) || [],
        }))

        const totalRevenue = completedSales.reduce((sum, sale) => sum + sale.amount, 0)
        const totalOrders = completedSales.length
        const uniqueCustomers = new Set(completedSales.map((s) => s.email)).size

        return NextResponse.json({
            sales: completedSales,
            stats: {
                totalRevenue,
                totalOrders,
                uniqueCustomers,
            }
        })

    } catch (error) {
        console.error("Admin sales error:", error)
        return NextResponse.json({ error: "Something went wrong"}, { status: 500 })
    }
}