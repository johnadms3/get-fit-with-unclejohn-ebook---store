import { auth, currentUser } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { supabase } from "../../lib/supabase"

// GET - fetch messages for a conversation
export async function GET(req: NextRequest){
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401})
        }

        const conversationId = req.nextUrl.searchParams.get("conversationId")
        if (!conversationId) {
            return NextResponse.json({ error: "Missing conversationId"}, { status: 400 })
        }
        
        // Admin can view any converation, customers can only view their own
        const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID
        if (!isAdmin && conversationId !== userId) {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401 })
        }

        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .eq("conversation_id", conversationId)
            .order("created_at", { ascending: true })

        if (error) throw error

        return NextResponse.json({ messages: data })
    } catch (error) {
        console.error("Messages GET error:", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}

// Post - send a new message
export async function POST(req: NextRequest) {
    try {

        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
    

    const user = await currentUser()
    const email = user?.emailAddresses?.[0]?.emailAddress || "Unkown"
    const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID

    const body = await req.json()
    const { content, conversationId } = body

    // Validate inputs
    if (!content || typeof content !== "string" || !conversationId) {
        return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }

    // Sanitize - limit message length
    const sanitizedContent = content.trim().slice(0,2000)
    if (sanitizedContent.length === 0) {
        return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 })
    }

    // Customers can only send to their own conversation
    if (!isAdmin && conversationId !== userId) {
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 })
    }


    const { data, error } = await supabase
        .from("messages")
        .insert({
            sender_id: userId,
            sender_email: email,
            sender_role: isAdmin ? "admin" : "customer",
            conversation_id: conversationId,
            content,
        })
        .select()
        .single()

    if (error) throw error

    return NextResponse.json({ message: data })

    } catch (error) {
        console.error("Messages POST error:", error)
        console.error("Messages POST error:", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}