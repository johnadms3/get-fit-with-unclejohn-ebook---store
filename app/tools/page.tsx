"use client"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import PageLayout from "../components/PageLayout"
import Link from "next/link"

export default function ToolsPage() {

    const { isSignedIn, isLoaded } = useUser()
    const [purchased, setPurchased] = useState(false)
    const [checking, setChecking] = useState(true)

    // Check Purchase status
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
        if (isSignedIn) {
            checkPurchase()
        } else { 
            setTimeout(() => setChecking(false), 0)
        }
    }, [isSignedIn])

     // Loading State
    if (!isLoaded || checking) {
        return (
            <PageLayout>
                <div className="flex items-center justify-center py-20">
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>Loading...</p>
                </div>
            </PageLayout>
        )
    }

    // Not Signed In
    if (!isSignedIn) {
    return (
        <PageLayout>
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                <p className="text-2x1 mb-4">🔒</p>
                <h2 className="text-lg font-medium mb-2" style={{ color: "var(--text-main)" }}>
                    Fitness Tools
                </h2>
                <p className="text-sm mb-6 max-w-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    Sign in and purchase <strong style={{ color: "var(--text-main)" }}>Get Right with Uncle John </strong>
                    to unlock the TDEE calculator and find out exactly how many calories you need to reach your goals.
                </p>
                <Link
                    href="/sign-in"
                    className="text-sm px-5 py-2.5 rounded-lg btn-animate"
                    style={{ background: "var(--accent)", color: "#fff" }}
                >
                    Sign In
                </Link>
            </div>
        </PageLayout>
    )
}

    // Not purchased
    if (!purchased) {
        return (
            <PageLayout>
                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                    <p className="text-2x1 mb-4">🔒</p>
                    <h2 className="text-lg font-medium mb-2" style={{ color: "var(--text-main)" }}>
                        Fitness Tools
                    </h2>
                    <p className="text-sm mb-6 max-w-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Purchase<strong style={{ color: "var(--text-main)" }}> Get Right with Uncle John</strong> to
                        unlock the TDEE calculator and find out exactly how many calories you need to reach your goals.                       
                    </p>
                    <Link
                        href="/"
                        className="text-sm px-5 py-2.5 rounded-lg btn-animate"
                        style={{ background: "var(--accent)", color: "#fff" }}
                    >
                        Get the book - $24.99
                    </Link>
                </div>
            </PageLayout>
        )
    }

   // Full Tools
    return (
        <PageLayout>
            <div className="px-4 sm:px-6 py-8 max-w-lg page-enter">

                <h1 className="text-2x1 font-medium mb-1" style={{ color: "var(--accent)" }}>
                    Fitness Tools
                </h1>
                <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                    Excluesive calculators to help you train smarter.
                </p>

                <div className="flex flex-col gap-4">

                    {/* TDEE Calculator Card */}
                    <Link   
                        href="/tools/tdee"
                        className="rounded-x1 p-5 flex items-center gap-4 hover-lift"
                        style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
                    >
                        <div
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-x1 flex-shrink-0"
                            style={{ background: "var(--red-bg)", color: "var(--accent)" }}
                        >
                           🔥 
                        </div>
                        <div>
                            <h2 className="text-base font-medium mb-1" style={{ color: "var(--text-main)" }}>
                                TDEE Calculator
                            </h2>
                            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                                Calculate your daily calorie needs based on your body and activity level. Get macro breakdowns for Protein, Carbs, and Fats.
                            </p>
                        </div>
                    </Link>

                    {/* 1RM Calculator Card */}
                    <Link
                        href="/tools/one-rep-max"
                        className="rounded-x1 p-5 flex items-center gap-4 hover-lift"
                        style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
                    >
                        <div    
                            className="w-12 h-12 rounded-lg flex items-center justify-center text-x1 flex-shrink-0"
                            style={{ background: "var(--gold-bg)", color: "var(--gold)" }}
                        >
                           🏋🏽‍♂️ 
                        </div>
                        <div>
                            <h2 className="text-base font-medium mb-1" style={{ color: "var(--text-main)" }}>
                                1 Rep Max Calculator
                            </h2>
                            <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                                Estimate your one-rep max for any lift and get a full percentage breakdown for every training goal.
                            </p>
                        </div>
                    </Link>


                </div>

            </div>
        </PageLayout>
    )
}