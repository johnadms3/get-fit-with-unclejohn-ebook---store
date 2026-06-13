import { NextRequest, NextResponse } from "next/server"
import { validateDiscount } from "../../data/discounts"

export async function POST(req: NextRequest) {
    try {
        const { code } = await req.json()

        if(!code) {
            return NextResponse.json(
                { error: "No code provided" },
                { status: 400 }
            )
        }

        const discount = validateDiscount(code)

        if(!discount) {
            return NextResponse.json(
                { error: "Invalid discount code" },
                { status: 404 }
            )
        }

        return NextResponse.json({ discount })
    }   catch (error) {
        console.error("Discount error:", error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}