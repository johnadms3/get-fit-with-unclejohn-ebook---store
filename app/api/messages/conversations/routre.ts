import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { supabase } from "../../../lib/supabase"

export async function GET() {
    try {
        const { userId } = await auth()
        if (userId !== process.env.NEXT_PUBLIC_ADMIN_USER_ID) {
            return NextResponse.json({ error: "Unauthorized"}, { status: 401 })
        }

        const { data, error } = await supabase
            .from("messages")
            .select("conversation_id, sender_email, content, created_at")
            .order("created_at", { ascending: false })

        if (error) throw error

        // Group by conversation and get the latest message from each
        const conversationMap = new Map<string, {
            conversationId: string
            email: string
            lastMessage: string
            lastDate: string
        }>()

        data.forEach((msg) => {
            if (!conversationMap.has(msg.conversation_id)) {
                conversationMap.set(msg.conversation_id,{
                    conversationId: msg.conversation_id,
                    email: msg.sender_email,
                    lastMessage: msg.content,
                    lastDate: new Date(msg.created_at).toLocaleDateString(),
                })
            }
        })
        const conversations = Array.from(conversationMap.values())

        return NextResponse.json({ conversations })

    } catch (error) {
        console.error("Conversations error:", error)
        return NextResponse.json({ error: "Something went wrong"})
    }
}