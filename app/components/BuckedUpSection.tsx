"use client"

import Image from "next/image"
import { useState } from "react"

const featuredProducts = [
    { src: "/preworkout-1.png", name: "Pre-workout" },
    { src: "/buckbuild.png", name: "Creatine" },
    { src: "/test-booster.png", name: "Testtosterone" },
    { src: "/bcaa.png", name: "BCAA" },
]

export default function BuckedUpSection(){

    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText("UNCLJHN30")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section 
            className="py-10 px-6 tex-center relative overflow-hidden"
            style={{ background: "var(--bg-sidebar" }}
        >
            {/* Gradient overlay */}
            <div    
                className="absolute inset-0"
                style={{
                    background: "linear-gradient(135deg, rgba(229,48,32,0.15) 0% rgba(212,150,10,0.1) 100%)",
                }}
            />

            <div className="relative">

                {/* Ambassador badge */}
                <span
                    className="inline-block text-xs font-medium px-3 py-1 rounded-lg mb-4 tracking-wider"
                    style={{ background: "rgba(229,48,32,0.3)", color: "var(--red-text)" }}
                >
                    AMBASSADOR
                </span>

                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <Image
                        src="/buckedup_logo1.png"
                        alt="BuckedUp"
                        width={180}
                        height={50}
                        className="object-contain"
                    />
                </div>

                <h2 className="text-lg font-medium mb-2" style={{ color: "var(--sidebar-text)" }}>
                    Fuel your workouts
                </h2>

                <p className="text-sm mb-6 leading-relaxed" style={{ color: "var(--sidebar-muted)" }}>
                    Premium supplements to maximize your results.<br />
                    Use my code for an exclusive discount!
                </p>

                {/* Product showcase */}
                <div className="flex justify-center gap-4 flex-wrap mb-8">
                    {featuredProducts.map((product) => (
                        <div key={product.name} className="flex flex-col items-center gap-2">
                            <div
                                className="w-20 h-20 rounded-lg flex items-center justify-center p-2 hover-scale"
                                style={{ background: "rgba(255,255,255,0.08)" }}
                            >
                                <Image
                                    src={product.src}
                                    alt={product.name}
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xs" style={{ color: "var(--sidebar-muted)" }}>
                                {product.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Promo code box */}
                <div 
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-lg mb-5"
                    style={{
                        background: "rgba(255,255,255,0.08)",
                        border: "1px dashed rgba(252,217,168,0.3)",
                    }}
                >
                    <span
                        className="text-x1 font-medium tracking-widest"
                        style={{ color: "var(--gold-bright)", fontFamily: "monospace" }}
                    >
                        UNCLJHN30
                    </span>
                    <button
                        onClick={handleCopy}
                        className="text-xs px-3 py-1.5 rounded transition-colors"
                        style={{ background: "rgba(252,217,168,0.15)", color: "var(--sidebar-text)" }}
                    >
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>

                <br />

                {/* Shop button */}
                <a
                    href="http://bckd.co/qBzeSW1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-medium px-7 py-3 rounded-lg btn-animate"
                    style={{ background: "var(--accent)", color: "#fff" }}
                >
                    Shop BuckedUp ↗
                </a>

                <p className="text-xs mt-3" style={{ color: "var(--sidebar-muted)" }}>
                    <span style={{ color: "var(--green)" }}>✓</span>Promo code auto-applies at checkout
                </p>
                
            </div>
        </section>
    )
}