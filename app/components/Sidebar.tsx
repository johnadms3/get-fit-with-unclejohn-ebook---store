"use client"

import Link from "next/link"
import Image from "next/image"
import { useCart } from "../context/CartContext"
import { useUser, UserButton } from "@clerk/nextjs"
import ThemeToggle from "./ThemeToggle"

export default function Sidebar() {

    const { cartCount } = useCart()
    const { isSignedIn, user }= useUser()

  return (
    <aside 
          className="hidden md:flex w-48 min-h-screen flex-col px-4 py-6 gap-2"
          style={{ background: "var(--bg-sidebar)" }}    
    >
      
      <p 
        className="text-sm font-medium leading-snug mb-4 pb-4"
        style={{ color: "var(--sidebar-text)" , borderBottom: "0.5px solid rgba(252,217,168,0,15)" }}
        >
        Get Fit With Uncle John
      </p>

      <Link 
        href="/" 
        className="text-sm px-3 py-2 rounded-lg transition-colors"
        style={{ color: "var(--sidebar-muted)" }}
        >
        Home
      </Link>

      <Link 
        href="/books" 
        className="text-sm px-3 py-2 rounded-lg transition-colors"
        style={{ color: "var(--sidebar-muted)" }}
        >
        Books
      </Link>

      <Link 
        href="/preview" 
        className="text-sm px-3 py-2 rounded-lg transition-colors"
        style={{ color: "var(--sidebar-muted)" }}
        >
        Preview
      </Link>

      <Link 
        href="/cart" 
        className="text-sm px-3 py-2 rounded-lg transition-colors"
        style={{ color: "var(--sidebar-muted)" }}
        >
        Cart ({cartCount})
      </Link>

      <Link
        href="/messages"
        className="text-sm px-3 py-2 rounded-lg transition-colors"
        style={{ color: "var(--sidebar-muted)" }}
        >
        Messages
      </Link>
      <Link
        href="/tools"
        className="text-sm px-3 py-2 rounded-lg transition-colors"
        style={{ color: "var(--sidebar-muted)" }}
        >
          Fitness Tools
        </Link>
      <Link
        href="/supplements"
        className="text-sm px-3 py-2 rounded-lg transition-colors flex items-center gap-2"
        style={{ color: "var(--sidebar-muted)" }}
      >
        <Image
          src="/buckedup_logo3.png"
          alt=""
          width={16}
          height={16}
          className="object-contain"
        />
        Supplements
      </Link>

      {isSignedIn && user?.id === process.env.NEXT_PUBLIC_ADMIN_USER_ID && (
        <>
        <Link
          href="/admin"
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

      {!isSignedIn &&(
        <Link
        href="/sign-in"
        className="text-sm px-3 py-2 rounded-lg transition-colors"
        style={{ color: "var(--sidebar-muted)" }}
        >
            Sign in 
        </Link>
      )}

      {isSignedIn && (
        <div className="flex items-center gap-2 px-3 py-2">
            <UserButton />
            <span className="text-xs" style={{ color: "var(--sidebar-muted)" }}>My account</span>
        </div>
      )}

      </div>

    </aside>
  )
}