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

        console.log("=== MESSAGE POST START ===")

        const { userId } = await auth()
        console.log("User ID:", userId)

        if (!userId) {
            console.log("No user ID - Unauthorized")
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }
    

    const user = await currentUser()
    const email = user?.emailAddresses?.[0]?.emailAddress || "Unkown"
    const isAdmin = userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID
    console.log("Email", email , "Is Admin", isAdmin)

    const body = await req.json()
    console.log("Request body:" , body)
    const { content, conversationId } = body

    // Validate inputs
    if (!content || typeof content !== "string" || !conversationId) {
        console.log("Invalid message data")
        return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }

    // Sanitize - limit message length
    const sanitizedContent = content.trim().slice(0,2000)
    if (sanitizedContent.length === 0) {
        console.log("Empty message after sanitize")
        return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 })
    }

    // Customers can only send to their own conversation
    if (!isAdmin && conversationId !== userId) {
        console.log("Conversation ID mismatch", conversationId, "vs", userId)
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 })
    }

    console.log("Attempthing Supabase insert...")

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

    if (error) {
        console.log("Supabase error", error)
        throw error
    }

    console.log("Message saved:", data)
    return NextResponse.json({ message: data })

    } catch (error) {
        console.error("Messages POST error:", error)
        console.error("Messages POST error:", error)
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}