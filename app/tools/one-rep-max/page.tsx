"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import PageLayout from "../../components/PageLayout"
import Link from "next/link"

const percentages = [ 
    { pct: 100, reps: "1", use: "Max strength" },
    { pct: 95, reps: "2", use: "Strength" },
    { pct: 90, reps: "3-4", use: "Strength" },
    { pct: 85, reps: "4-5", use: "Strength/Power" },
    { pct: 80, reps: "5-6", use: "Hypertrophy" },
    { pct: 75, reps: "8-10", use: "Hypertrophy" },
    { pct: 70, reps: "10-12", use: "Endurance" },
    { pct: 65, reps: "12-15", use: "Endurance" },
    { pct: 60, reps: "15-20", use: "Warmup / Recovery" },
]

export default function OneRepMaxPage() {

    const { isSignedIn, isLoaded } = useUser()
    const [purchased, setPurchased] = useState(false)
    const [checking, setChecking] = useState(true)

    const [exercise, setExercise] = useState("Bench Press")
    const [weight, setWeight] = useState("")
    const [reps, setReps] = useState("")
    const [oneRM, setOneRM] = useState<number | null>(null)

    useEffect(() => {
        async function checkPurchase() {
            try {
                const res = await fetch("/api/verify-purchase")
                const data = await res.json()
                setPurchased(data.puchased)
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
    },[isSignedIn])

    const handleCalculate = () => {
        const w = parseFloat(weight)
        const r = parseInt(reps)
        if (!w || !r || r < 1) return

        if(r === 1) {
            setOneRM(Math.round(w))
        } else {
            // Epley formula: 1RM = weight x (1 + reps / 30)
            const estimated = w * (1 + r / 30)
            setOneRM(Math.round(estimated))
        }
    }

    if (!isLoaded || checking) {
        return(
            <PageLayout>
                <div className="flex items-center justify-center py-20">
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>Loading...</p>
                </div>
            </PageLayout>
        )
    }

    if (!isSignedIn) {
        return (
            <PageLayout>
                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                    <p className="text-2x1 mb-4">🔒</p>
                    <h2 className="text-lg font-medium mb-2" style={{ color: "var(--text-main)" }}>
                        1 Rep Max Calculator
                    </h2>
                    <p className="text-sm mb-6 max-w-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Sign in and purchase either program to unlock the 1RM calculator and find your max stength for any lift.
                    </p>
                    <Link
                        href="/sign-in"
                        className="tex-sm px-5 py-2.5 rounded-lg btn-animate"
                        style={{ background: "var(--accent)", color: "#fff" }}
                    >
                        Sign in
                    </Link>
                </div>
            </PageLayout>
        )
    }

     if (!purchased) {
        return (
            <PageLayout>
                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                    <p className="text-2x1 mb-4">🔒</p>
                    <h2 className="text-lg font-medium mb-2" style={{ color: "var(--text-main)" }}>
                        1 Rep Max Calculator
                    </h2>
                    <p className="text-sm mb-6 max-w-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                        Purchase either program to unlock the 1RM calculator and find your max stength for any lift.
                    </p>
                    <Link
                        href="/"
                        className="tex-sm px-5 py-2.5 rounded-lg btn-animate"
                        style={{ background: "var(--accent)", color: "#fff" }}
                    >
                        Get the book - $24.99
                    </Link>
                </div>
            </PageLayout>
        )
    }

    return (
        <PageLayout>
            <div className="px-4 sm:px-6 py-8 max-w-lg page-enter">

                <h1 className="text-2x1 font-medium mb-1" style={{ color: "var(--accent)" }}>
                    1 Rep Max Calculator
                </h1>
                <p className="text-sm mb-8 leading-relaxed" style={{ color:"text-muted)" }}>
                    Estimate your one-rep max based on a weight you&apos;ve lifted for multiple reps. Uses the Epley formula for accuracy.
                </p>

                {/* Exercise */}
                
            </div>
        </PageLayout>
    )
}