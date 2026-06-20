"use client" 

import { useUser } from "@clerk/nextjs"
import Link from "next/link"

export default function AdminGuard({ children }: { children: React.ReactNode }) {

    const { user, isLoaded }  = useUser()

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-sm" style={{ color: "var(--text-muted" }}>Loading...</p>
            </div>
        )
    }

    if (!user || user.id !== process.env.NEXT_PIBLIC_ADMIN_USER_ID) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium mb-2" style={{ color: "var(--accent)" }}>Access Denied</p>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    This page is for the site administrator only
                </p>
                <Link
                    href="/"
                    className="text-sm px-5 py-2.5 rounded-lg btn-animate"
                    style={{ background: "var(--accent)", color:"#fff" }}
                    >
                        Back to store
                    </Link>
            </div>
        )
    }

    return <>{children}</>
}