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
                <Link href="/tools" className="text-xs mb-4 inline-block" style={{ color: "var(--accent)" }}>
                    ⃖ Back to tools
                </Link>

                <h1 className="text-2x1 font-medium mb-1" style={{ color: "var(--accent)" }}>
                    1 Rep Max Calculator
                </h1>
                <p className="text-sm mb-8 leading-relaxed" style={{ color:"text-muted)" }}>
                    Estimate your one-rep max based on a weight you&apos;ve lifted for multiple reps. Uses the Epley formula for accuracy.
                </p>

                {/* Exercise */}
                <div className="mb-4">
                    <label className="text-xs font-medium block mb-2" style={{ color: "var(--text-main)" }}>
                        Exercise
                    </label>
                    <select
                        value={exercise}
                        onChange={(e) => setExercise(e.target.value)}
                        className="w-full text-sm px-4 py-2.5 rounded-lg outline-none"
                        style={{
                            background: "var(--bg-surface)",
                            border: "0.5px solid var(--border)",
                            color: "var(--text-main)",
                        }}
                    >
                        <option>Bench Press</option>
                        <option>Squat</option>
                        <option>Deadlift</option>
                        <option>Overhead Press</option>
                        <option>Barbell Row</option>
                        <option>Other</option>
                    </select>
                </div>

                {/* Weight */}
                <div className="mb-4">
                    <label className="text-xs font-medium block mb-2" style={{ color: "var(--text-main)" }}>
                        Weight Lifted
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="185"
                            className="w-full text-sm px-4 py-2.5 rounded-lg outline-none"
                            style={{
                                background: "var(--bg-surface)",
                                border: "0.5px solid var(--border)",
                                color: "var(--text-main)",
                            }}
                        />
                        <span
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
                            style={{ color: "var(--text-muted)" }}
                        >
                            lbs
                        </span>
                    </div>
                </div>

                {/* Reps */}
                <div className="mb-6">
                    <label className="text-xs font-medium block mb-2" style={{ color: "var(--text-main)" }}>
                        Reps Completed
                    </label>
                    <input 
                        type="number"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        placeholder="6"
                        className="w-full text-sm px-4 py-2.5 rounded-lg outline-none"
                        style={{
                            background:"var(--bg-surface)",
                            border: "0.5px solid var(--border)",
                            color: "var(--text-main)",
                        }}
                    /> 
                </div>

                {/* Calculate Button */}
                <button
                    onClick={handleCalculate}
                    className="w-full text-sm font-medium py-3 rounded-lg btn-animate"
                    style={{ background: "var(--accent)", color: "#fff" }}
                >
                    Calculate 1RM
                </button>

                {/* Results */}
                {oneRM && (
                    <div 
                        className="rounded-x1 p-6 text-center mt-6 relative overflow-hidden"
                        style={{ background: "var(--bg-sidebar)" }}
                    >
                        <div 
                            className="absolute inset-0"
                            style={{ 
                                background: "linear-gradient(135deg, rgba(229,48,32,0.15) 0% rgba(212,150,10,0.1) 100%",
                            }}
                        />

                        <div className="relative">
                            <p
                                className="text-xs uppercase tracking-widest mb-2"
                                style={{ color: "var(--sidebar-muted)" }}
                            >
                                Estimated 1 Rep Max
                            </p>

                            <p 
                                className="text-4x1 font-medium mb-1"
                                style={{ color: "var(--gold-bright)" }}
                            >
                                {oneRM} lbs
                            </p>

                            <p className="text-sm mb-6" style={{ color: "var(--sidebar-text)" }}>
                                {exercise}
                            </p>

                            {/* Percentage breakdown table */}
                            <div className="overflow-x-auto">
                                <table className="w-full" style={{ borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr style={{ borderBottom: "0.5px solid rgba(252,217,168,0.15)" }}>
                                            <th
                                                className="text-left text-xs py-2 px-2"
                                                style={{ color: "var(--sidebar-muted" }}
                                            >
                                                %
                                            </th>
                                            <th
                                                className="text-left text-xs py-2 px-2"
                                                style={{ color: "var(--sidebar-muted)" }}
                                            >
                                                Weight
                                            </th>
                                             <th
                                                className="text-left text-xs py-2 px-2"
                                                style={{ color: "var(--sidebar-muted)" }}
                                            >
                                                Reps
                                            </th>
                                             <th
                                                className="text-left text-xs py-2 px-2"
                                                style={{ color: "var(--sidebar-muted)" }}
                                            >
                                                Best for
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {percentages.map((row) => {
                                            const rowWeight= Math.round(oneRM * (row.pct / 100))
                                            return (
                                                <tr
                                                    key={row.pct}
                                                    style={{ borderBottom: "0.5px soild rgba(252,217,168,0.08)" }}
                                                >
                                                    <td
                                                        className="text-sm py-2 px-2"
                                                        style={{ color: "var(--sidebar-muted)" }}
                                                    >
                                                        {row.pct}%
                                                    </td>
                                                    <td
                                                        className="text-sm py-2 px-2 font-medium"
                                                        style={{ color: "var(--sidebar-text)" }}
                                                    >
                                                        {rowWeight} lbs
                                                    </td>
                                                    <td
                                                        className="text-sm py-2 px-2"
                                                        style={{ color: "var(--sidebar-muted)" }}
                                                    >
                                                        {row.reps}
                                                    </td>
                                                    <td
                                                        className="text-xs py-2 px-2"
                                                        style={{
                                                            color: row.pct>= 85
                                                                ? "var(--accent)"
                                                                : row.pct >= 70
                                                                ? "var(--gold)"
                                                                : "var(--sidebar-muted)",
                                                        }}
                                                    >
                                                        {row.use}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </PageLayout>
    )
}