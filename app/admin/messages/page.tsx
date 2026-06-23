"use client"

import { useEffect, useState, useRef } from "react"
import { useUser } from "@clerk/nextjs"
import PageLayout from "../../components/PageLayout"
import AdminGuard from "../../components/AdminGuard"

type Conversation = {
    conversationId: string
    email: string
    lastMessage: string
    lastDate: string
}

type Message = {
    id: string
    sender_id: string
    sender_role: string
    sender_email: string
    content: string
    created_at: string
}

export default function AdminMessagesPage() {

    const { user } = useUser()
    const [conversations, setConversations] = useState<Conversation[]>([])
    const [activeConvo, setActiveConvo] = useState<string | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState("")
    const [sending, setSending] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    // Load conversations
    useEffect(() => {
        async function loadConversations(){
            try {
                const res = await fetch("/api/messages/conversations")
                const data = await res.json()
                if (data.conversations) setConversations(data.conversations)
            } catch (err) {
                console.error("Failed to load conversations:", err)
            }
        }
        loadConversations()
        const interval = setInterval(loadConversations, 10000)
        return () => clearInterval(interval)
    }, [])

    //Load messages for active conversation
    useEffect(() => {
        async function loadMessages() {
            if (!activeConvo) return
            try {
                const res = await fetch(`/api/messages?conversationId=${activeConvo}`)
                const data = await res.json()
                if (data.messages) setMessages(data.messages)
            } catch(err) {
                console.error("Failed to load messages:", err)
            }
        }
        loadMessages()
        const interval = setInterval(loadMessages, 5000)
        return () => clearInterval(interval)
    }, [activeConvo])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = async () => {
        if (!newMessage.trim() || !activeConvo || !user) return
        setSending(true)
        try {
            const res = await fetch("/api/messages",{
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({
                    content: newMessage,
                    conversationId: activeConvo,
                }),
            })
            const data = await res.json()
            if (data.message) {
                setMessages((prev) => [...prev, data.message])
                setNewMessage("")
            }
        } catch (err) {
            console.error("Failed to send:", err)
        }
        setSending(false)
    }

    return (
        <PageLayout>
            <AdminGuard>
                <div 
                    className="flex h-[calc(100vh-60px)] md:h-screen"
                    style={{ borderRight: "0.5px solid var(--border)", background: "var(--bg-surface" }}
                >
                    <div className="px-4 py-4" style={{ borderBottom: "0.5px solid var(--border)" }}>
                        <h2 className="text-sm font-medium" style={{ color: "var(--text-main)" }}>
                            Conversations
                        </h2>
                    </div>

                    {conversations.length === 0 ? (
                        <div className="px-4 py-8 text-center">
                            <p className="text-xs" style={{ color: "var(--text-muted)" }}>No conversations yet</p>
                        </div>
                    ) : (
                        conversations.map((convo) => (
                            <div
                                key={convo.conversationId}
                                onClick={() => setActiveConvo(convo.conversationId)}
                                className="px-4 py-3 curson-pointer transition-colors"
                                style={{
                                    borderBottom: "0.5px solid var(--border)",
                                    background: activeConvo === convo.conversationId ? "var(--bg-card)" : "transparent",
                                }}
                            >
                                <p className="text-sm font-medium truncate" style={{ color: "var(--text-main)" }}>
                                    {convo.email}
                                </p>
                                <p className="text-xs truncate mt-1" style={{ color: "var(--text-muted)" }}>
                                    {convo.lastMessage}
                                </p>
                                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                                    {convo.lastDate}
                                </p>
                            </div>
                        ))
                    )}
                </div> 
                
                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {!activeConvo ? (
                        <div className="flex-1 flex items-center justify-center">
                            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                                Select a conversation to reply
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
                                <div className="flex flex-col gap-3 max-w-2x1">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender_role === "admin" ? "justify-end" : "justify-start"}`}
                                        >
                                            <div
                                            className="rounded-x1 px-4 py-3 max-w-[80%]"
                                            style={{
                                                background: msg.sender_role === "admin" ? "var(--accent)" : "var(bg-card)",
                                                border: msg.sender_role === "customer" ? "0.5px solid var(--border)" : "none",
                                            }}
                                            >
                                                {msg.sender_role === "customer" && (
                                                    <p className="text-xs font-medium mb-1" style={{ color: "var(--gold)" }}>
                                                        {msg.sender_email}
                                                    </p>
                                                )}
                                                <p
                                                    className="text-sm leading-relaxed"
                                                    style={{
                                                        color: msg.sender_role === "admin" ? "#FFFFFF" : "var(--text-main)",
                                                    }}
                                                >
                                                    {msg.content}
                                                </p>
                                                <p
                                                    className="text-xs mt-1"
                                                    style={{
                                                        color: msg.sender_role === "admin" ? "rgba(255,255,255,0.6)" : "var(--text-muted)",
                                                    }}
                                                >
                                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={bottomRef} />
                                </div>
                            </div>

                            <div 
                                className="px-4 sm:px-6 py-4 flex-shrink-0"
                                style={{ borderTop: "0.5px solid var(--border)", background: "var(--bg-surface)" }}
                            >
                                <div className="flex gap-2 max-w-2x1">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && !sending && handleSend()}
                                        placeholder="Replay..."
                                        className="flex-1 text-sm px-4 py-3 rounded-lg outline-none"
                                        style={{
                                            background: "var(--bg-card)",
                                            border: "0.5px solid var(--border)",
                                            color: "var(--text-main)",
                                        }}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={sending || !newMessage.trim()}
                                        className="text-sm px-5 py-3 rounded-lg btn-animate disabled:opacity-50"
                                        style={{ background:"var(--accent)", color: "#fff" }}
                                    >
                                        {sending ? "..." : "Send"}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            
            </AdminGuard>
        </PageLayout>
    )
}