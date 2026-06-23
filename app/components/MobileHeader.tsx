"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "../context/CartContext"
import { useUser, UserButton } from "@clerk/nextjs"
import ThemeToggle from "./ThemeToggle"

export default function MobileHeader() {
    const [menuOpen, setMenuOpen] = useState(false)
    const { cartCount } = useCart()
    const { isSignedIn, user } = useUser()


    return (
        <div className="md:hidden">

            {/* Top bar */}
            <div 
                className="flex items-center justify-between px-4 py-3"
                style={{ background: "var(--sidebar)", color: "var(--sidebar-text)" }}
            >
                <Link href="/" className="text-sm font-medium" style={{ color: "var(--sidebar-text)" }}>
                Get Right With Uncle John
                </Link>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="text-2x1 leading-none"
                    style={{ color: "var(--sidebar-text)" }}
                    >
                        {menuOpen ? "x" : "☰"}
                    </button>
            </div>

            {/* Slide-out menu */}
            {menuOpen && (
                <div className="fixed inset-0 z-50 flex">

                    {/* /* Dark overlay behind the menu */}
                    <div
                        className="fixed inset-0 bg-black/40"
                        onClick={() => setMenuOpen(false)}
                    />

                    {/* The menu itself */}
                    <div 
                        className="relative z-50 w-64 min-h-screen flex flex-col px-4 py-6 gap-2 shadow-lg"
                        style={{ background: "var(--bg-sidebar)" }}
                        >

                        <p 
                            className="text-sm font-medium leading-sung mb-4 pb-4"
                            style={{ color: "var(--sidebar-text)", borderBottom: "0.5px solid rgba(252,217,168,0,15" }}
                            >
                            Get Right With Uncle John
                        </p>

                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm px-3 py-2 rounded-lg transition-colors"
                            style={{ color: "var(--sidebar-muted)" }}
                            >
                                Home
                        </Link>

                        <Link
                            href="/books"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm px-3 py-2 rounded-lg transition-colors"
                            style={{ color: "var(--sidebar-muted)" }}
                            >
                                Books
                        </Link>

                        <Link
                            href="/preview"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm px-3 py-2 rounded-lg transition-colors"
                            style={{ color: "var(--sidebar-muted)" }}>
                                Preview
                        </Link>

                        <Link
                             href="/cart"
                            onClick={() => setMenuOpen(false)}
                            className="text-sm px-3 py-2 rounded-lg transition-colors"
                            style={{ color: "var(--sidebar-muted)" }}>
                                Cart({cartCount})
                        </Link>

                        <Link
                            href="/messages"
                            className="text-sm px-3 py-2 rounded-lg transition-colors"
                            style={{ color: "var(--sidebar-muted)" }}
                            >
                                Messages
                            </Link>

                        {isSignedIn && user?.id === process.env.NEXT_PUBLIC_ADMIN_USER_ID && (
                            <>
                            <Link
                                href="/admin"
                                onClick={() => setMenuOpen(false)}
                                className="text-sm px-3 py-2 rounded-lg transition-colors"
                                style={{ color: "var(--gold)" }}
                            >
                                Admin
                            </Link>

                            <Link
                                href="/admin/messages"
                                className="text-sm px-3 py-2 rounded-lg transition-colors"
                                style={{ color: "var(--gold)" }}
                                >
                                    Inbox
                            </Link>
                            </>
                        )}
                        <div className="mt-auto flex flex-col gap-2">
                        <a
                                href="https://www.tiktok.com/t/ZTBcGoGJo/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm px-3 py-2 rounded-lg transition-colors"
                                style={{ color: "var(--sidebar-muted)" }}
                        >
                            TikTok ↗
                        </a>
                        

                            <ThemeToggle />


                            {!isSignedIn && (
                                <Link
                                     href="/sign-in"
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm px-3 py-2 rounded-lg transition-colors"
                                    style={{ color: "var(--sidebar-muted)" }}
                                    >
                                    Sign in
                                </Link>
                            )}


                            {isSignedIn &&(
                                <div className="flex items-center gap-2 px-3 py-2">
                                    <UserButton />
                                    <span className="text-xs" style={{ color: "var(--sidebar-muted)" }}>My account</span>
                                </div>
                            )}
                        </div>


                    </div>  
                </div>
            )}


        </div>
    )
}