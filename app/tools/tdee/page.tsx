"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import PageLayout from "../../components/PageLayout"
import Link from "next/link"

type Results = {
    bmr: number
    tdee: number
    lose: number 
    gain: number
    protein: number
    carbs: number
    fats: number
}

export default function ToolsPage() {

    const { isSignedIn, isLoaded } = useUser()
    const [purchased, setPurchased] = useState(false)
    const [checking, setChecking] = useState(true)

    // Form state
    const [gender, setGender] = useState<"male" | "female">("male")
    const [age, setAge] = useState("")
    const [feet, setFeet] = useState("")
    const [inches, setInches] = useState("")
    const [weight, setWeight] = useState("")
    const [activity, setActivity] = useState("1.55")
    const [results, setResults] = useState<Results | null>(null)

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

    const handleCalculate = () => {
        const ageNum = parseInt(age)
        const weightNum = parseFloat(weight)
        const heightInches = parseInt(feet) * 12 * parseInt(inches)
        const activityNum = parseFloat(activity)

        if (!ageNum || !weightNum || !heightInches) return

        // Convert to metric for Mifflin- St Jeor equation
        const weightKg = weightNum * 0.453592
        const heightCm = heightInches * 2.54

        // BMR calculation (Mifflin- St Jeor)
        let bmr: number
        if (gender === "male") {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum + 5
        } else {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageNum - 161
        }

        const tdee = Math.round(bmr * activityNum)
        const lose = tdee - 500
        const gain = tdee + 500

        // Macro split: 30% protein, 45% carbs, 25% fat
        const proteinCals = tdee * 0.3
        const carbsCals = tdee * 0.45
        const fatsCals = tdee * 0.25

        setResults({
            bmr: Math.round(bmr),
            tdee,
            lose,
            gain,
            protein: Math.round(proteinCals / 4), //4 cal per gram
            carbs: Math.round(carbsCals / 4), // 4 cal per gram
            fats: Math.round(fatsCals / 9), // 9 cal per gram
        })
    }

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
                        TDEE Calculator
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
                        TDEE Calculator
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

    // Full Calculator
    return (
        <PageLayout>
            <div className="px-4 sm:px-6 py-8 max-w-lg page-enter">
                <Link href="/tools" className="text-xs mb-4 inline-block" style={{ color: "var(--accent)" }}>
                    ⃖ Back to tools
                </Link>

                <h1 className="text-2x1 font-medium mb-1" style={{ color: "var(--accent)" }}>
                    TDEE Calculator
                </h1>
                <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                    Calculate your daily calorie needs based on your body and activity level.
                </p>

                {/* Gender */}
                <div className="mb-4">
                    <label className="text-xs font-medium block mb-2" style={{ color: "var(--text-main)" }}>
                        Gender
                    </label>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setGender("male")}
                            className="flex-1 text-sm py-2.5 rounded-lg transition-colors"
                            style={{
                                background: gender === "male" ? "var(--accent)" : "var(--bg-surface)",
                                color: gender === "male" ? "#fff" : "var(--text-muted)",
                                border: gender === "male" ? "none" : "0.5px solid var(--border)",
                            }}
                        >
                            Male
                        </button>
                        <button
                            onClick={() => setGender("female")}
                            className="flex-1 text-sm py-2.5 rounded-lg transistion-colors"
                            style={{
                                background: gender === "female" ? "var(--accent)" : "var(--bg-surface)",
                                color: gender === "female" ? "#fff" : "var(--text-muted)",
                                border: gender === "female" ? "none" : "0.5px solid var(--border)",
                            }}
                        >
                            Female
                        </button>
                    </div>
                </div>

                {/* Age */}
                <div className="mb-4">
                    <label className="text-xs font-medium block mb-2" style={{ color: "var(--text-main)" }}>
                        Age
                    </label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="28"
                        className="w-full text-sm px-4 py-2.5 rounded-lg outline-none"
                        style={{
                            background: "var(--bg-surface)",
                            border: "0.5 solid var(--border)",
                            color: "var(--text-main)",
                        }}
                    />
                </div>

                {/* Height */}
                <div className="mb-4">
                    <label className="text-xs font-medium block mb-2">
                        Height
                    </label>
                    <div className="flex gap-2">
                        <div className="flex-1 relative">
                            <input
                                type="number"
                                value={feet}
                                onChange={(e) => setFeet(e.target.value)}
                                placeholder="5"
                                className="w-full text-sm px-4 py-2.5 rounded-lg outline-none"
                                style={{
                                    background: "var(--bg-surface",
                                    border: "0.5px solid var(--border)",
                                    color: "var(--text-main)",
                                }}
                            />
                            <span className="absoulte right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: "var(--text-muted)" }}>ft</span>
                        </div>
                        <div className="flex-1 relative">
                            <input
                                type="number"
                                value={inches}
                                onChange={(e) => setInches(e.target.value)}
                                placeholder="10"
                                className="w-ful text-sm px-4 py-2.5 rounded-lg outline-none"
                                style={{
                                    background: "var(--bg-surface)",
                                    border: "0.5px solid var(--border)",
                                    color: "var(--text-main)",
                                }}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: "var(--text-muted)" }}>in</span>
                        </div>
                    </div>
                </div>

                {/* Weight */}
                <div className="mb-4">
                    <label className="text-xs font-medium block mb-2">
                        Weight
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="180"
                            className="w-full text-sm px-4 py-2.5 rounded-lg outline-none"
                            style={{
                                background: "var(--bg-surface)",
                                border: "0.5px solid var(--border)",
                                color: "var(--text-main)",
                            }}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: "var(--text-muted)" }}>lbs</span>
                    </div>
                </div>

                {/* Activity Level */}
                <div className="mb-4">
                    <label className="text-xs font-medium block mb-2">
                        Activity Level
                    </label>
                    <select
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="w-full text-sm px-4 py-2.5 rounded-lg outline-none"
                        style={{
                            background: "var(--bg-surface)",
                            border: "0.5px solid var(--border)",
                            color: "var(--text-main)",
                        }}
                    >
                        <option value="1.2">Sedentary (little to no exercise)</option>
                        <option value="1.375">Lightly Active (1-3 day/week)</option>
                        <option value="1.55">Moderately Active (3-5 day/week)</option>
                        <option value="1.725">Very Active (6-7 day/week)</option>
                        <option value="1.9">Extra Active (athlete / physical job)</option>
                    </select>
                </div>

                {/* Calculate Button*/}
                <button
                    onClick={handleCalculate}
                    className="w-full text-sm font-medium py-3 rounded-lg btn-animate"
                    style={{ background: "var(--accent)", color: "#fff" }}
                >
                    Calculate TDEE
                </button>

                {/* Results */}
                {results && (
                    <div 
                        className="rounded-x1 p-6 text-center mt-6 relative overflow-hidden"
                        style={{ background: "var(--bg-surface)" }}
                    >
                        <div 
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(135deg, rgba(229,48,32,0.15) 0%, rgba(212,150,10,0.1) 100%)",
                        }}
                        />

                        <div className="relative">
                            <p
                                className="text-xs uppercase tracking-widest mb-2"
                                style={{ color: "var(--sidebar-muted)" }}
                            >
                                You Daily Calories
                            </p>

                            <p 
                                className="text-4x1 font-medium mb-1"
                                style={{ color: "var(--gold-bright)" }}
                            >
                                {results.tdee.toLocaleString()}
                            </p>

                            <p className="text-sm mb-6" style={{ color: "var(--gold-bright)" }}>
                                Calories per day to maintain weight
                            </p>

                            {/* Goal Targets */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div
                                    className="rounded-lg p-3 text-center"
                                    style={{ background: "rgba(255,255,255,0.06)" }}
                                >
                                    <p className="text-xs mb-1" style={{ color: "var(--sidebar-muted)" }}>Lose Weight</p>
                                    <p className="text-lg font-medium" style={{ color: "#FF8078" }}>
                                        {results.lose.toLocaleString()}
                                    </p>
                                </div>
                                 <div
                                    className="rounded-lg p-3 text-center"
                                    style={{ background: "rgba(255,255,255,0.06)" }}
                                >
                                    <p className="text-xs mb-1" style={{ color: "var(--sidebar-muted)" }}>Maintain</p>
                                    <p className="text-lg font-medium" style={{ color: "var(--gold-bright)" }}>
                                        {results.tdee.toLocaleString()}
                                    </p>
                                </div>
                                  <div
                                    className="rounded-lg p-3 text-center"
                                    style={{ background: "rgba(255,255,255,0.06)" }}
                                >
                                    <p className="text-xs mb-1" style={{ color: "var(--sidebar-muted)" }}>Gain Muscle</p>
                                    <p className="text-lg font-medium" style={{ color: "#4CAF50" }}>
                                        {results.gain.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Macro Breakdown */}
                            <div className="grid grid-cols-3 gap-2">
                                  <div
                                    className="rounded-lg p-3 text-center"
                                    style={{ background: "rgba(255,255,255,0.06)" }}
                                >
                                    <p className="text-xs mb-1" style={{ color: "var(--sidebar-muted)" }}>Protein</p>
                                    <p className="text-lg font-medium" style={{ color: "var(--gold-bright)" }}>
                                        {results.protein}g
                                    </p>
                                    <p className="text-xs" style={{ color: "var(--sidebar-muted}" }}>30%</p>
                                </div>
                                 <div
                                    className="rounded-lg p-3 text-center"
                                    style={{ background: "rgba(255,255,255,0.06)" }}
                                >
                                    <p className="text-xs mb-1" style={{ color: "var(--sidebar-muted)" }}>Carbs</p>
                                    <p className="text-lg font-medium" style={{ color: "var(--gold-bright)" }}>
                                        {results.carbs}g
                                    </p>
                                    <p className="text-xs" style={{ color: "var(--sidebar-muted}" }}>45%</p>
                                </div>
                                 <div
                                    className="rounded-lg p-3 text-center"
                                    style={{ background: "rgba(255,255,255,0.06)" }}
                                >
                                    <p className="text-xs mb-1" style={{ color: "var(--sidebar-muted)" }}>Fats</p>
                                    <p className="text-lg font-medium" style={{ color: "var(--gold-bright)" }}>
                                        {results.fats}g
                                    </p>
                                    <p className="text-xs" style={{ color: "var(--sidebar-muted}" }}>25%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </PageLayout>
    )
}