"use client"

import { useEffect, useState, useRef } from "react"
import { useUser } from "@clerk/nextjs"
import PageLayout from "../components/PageLayout"
import Link from "next/link"

type Message = {
    id: string
    sender_id: string
    sender_role: string
    content: string
    created_at: string
}

export default function MessagesPage() {

    const { user, isSignedIn, isLoaded } = useUser()
    const [messages, setMessages] = useState<Message[]>([])
    const[newMessage, setNewMessage] = useState("")
    const [sending, setSending] = useState(false)
    const [purchased, setPurchased] = useState(false)
    const [checking, setChecking] = useState(true)
    const bottomRef = useRef<HTMLDivElement>(null)

    // Check if user has purchased
    useEffect(() => {
        async function checkPurchase() {
            try {
                const res = await fetch("/api/verify-purchase")
                const data = await res.json()
                setPurchased(data.purchased)
            } catch {
                setPurchased(false)
            }
            setChecking(false)
        }
        if (isSignedIn) checkPurchase()
        setTimeout(() => setChecking(false), 0)
    }, [isSignedIn])

    // Load messages
    useEffect(() => {
        async function loadMessages() {
            if (!user || !purchased) return
            try {
                const res = await fetch(`/api/messages?conversationId=${user.id}`)
                const data = await res.json()
                if (data.messages) setMessages(data.messages)
            } catch (err) {
        console.error("Failed to load messages:", err)
            }
        }
        loadMessages()
        const interval = setInterval(loadMessages, 5000) // Pull every 5 seconds
        return () => clearInterval(interval)
    }, [user, purchased])

    // Auto-scroll to bottom 
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = async () => {
        if (!newMessage.trim() || !user) return
        setSending(true)
        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: newMessage,
                    conversationId: user.id,
                }),
            })
            const data = await res.json()
            if (data.message) {
                setMessages((prev) => [...prev,data.message])
                setNewMessage("")
            }
        } catch (err) {
            console.error("Failed to send:", err)
        }
        setSending(false)
    }

    if (!isLoaded || checking) {
        return (
            <PageLayout>
                <div className="flex items-center justify-center py-20">
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading...</p>
                </div>
            </PageLayout>
        )
    }

    if (!isSignedIn) {
        return (
            <PageLayout>
                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                    <p className="text-lg font-medoum mb-2" style={{ color: "var(--text-main)"}}>
                        Sign in to access messages
                    </p>
                    <Link
                        href="/sign-in"
                        className="text-sm px-5 py-2.5 rounded-lg btn-animate mt-4"
                        style={{ background: "var(--accent)", color: "#fff"}}
                        >
                            Sign in
                        </Link>
                </div>
            </PageLayout>
        )
    }

    if (!purchased) {
        return(
            <PageLayout>
                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                    <p className="text-2x1 mb-2">🔒</p>
                    <p className="text-lg font-medium mb-2" style={{ color: "var(--text-main) "}}>
                        Exclusive to book owners
                    </p>
                    <p className="text-sm mb-6 max-w-sm leading-relaxed" style={{ color: "(--text-muted)" }}>
                        Purchase<strong style={{ color: "var(--text-main)" }}>Get Right With Uncle John</strong> to unlock
                        direct messaging with Unlce John for personalized fitness guidance.
                    </p>
                    <Link 
                        href="/"
                        className="text-sm px-5 py-2.5 rounded-lg btn-animate"
                        style={{ background: "var(--accent)", color: "#fff" }}
                        >
                            Get the book
                        </Link>
                </div>
            </PageLayout>
        )
    }


return (
    <PageLayout>
        <div className="flex flex-col h-[calc(100vh-60px)] md:h-screen">
            {/*Header*/}
            <div
                className="px-4 sm:px-6 py-4 flex-shrink-0"
                style={{ borderBottom:"0.5px solid var(--border)" }}
            >
                <h1 className="text-lg font-medium" style={{ color: "var(--accent)" }}>
                    Message Uncle John
                </h1>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Ask questions about the program -- I&apos;ll get back to you!
                </p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4">
                {messages.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                            No messages yet -- say Hello! 👋🏽
                        </p>
                    </div>
                ) : ( 
                    <div className="flex flex-col gap-3 max-w-2x1">
                        {messages.map((msg) => (
                            <div    
                                key={msg.id}
                                className={`flex ${msg.sender_role === "customer" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                className="rounded-x1 px-4 py-3 max-w-[80%]"
                                style={{
                                    background: msg.sender_role === "customer" ? "var(--accent)" : "var(--bg-card)",
                                    border: msg.sender_role === "admin" ? "0.5px solid var(--border)" : "none",
                                }}
                                >
                                    {msg.sender_role === "admin" && (
                                        <p className="text-xs font-medium mb-1" style={{ color: "var(--gold)" }}>
                                            Uncle John
                                        </p>
                                    )}
                                    <p
                                        className="text-sm leading-relaxed"
                                        style={{
                                            color: msg.sender_role === "customer" ? "#FFFFFF" : "var(--text-main)",
                                        }}
                                    >
                                        {msg.content}
                                    </p>
                                    <p
                                        className="text-xs mt-1"
                                        style={{
                                            color: msg.sender_role === "customer" ? "rgba(255,255,255,0.6)" : "var(--text-muted)",
                                        }}
                                    >
                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
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
                        placeholder="Typer your message..."
                        className="flex-1 text-sm px-4 py-3 rpunded-lg outline-none"
                        style={{
                            background: "var(--bg-card)",
                            border:"0.5px solid var(--border)",
                            color: "var(--text-main)",
                        }}
                    />
                    <button
                        onClick={handleSend}
                        disabled={sending || !newMessage.trim()}
                        className="text-sm px-5 py-3 rounded-lg btn-animate disabled:opacity-50"
                        style={{ background: "var(--accent", color: "#fff" }}
                    >
                        {sending ? "..." : "Send"}
                    </button>
                </div>
            </div>

        </div>
    </PageLayout>
)
}