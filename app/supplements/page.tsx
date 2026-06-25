"use client"

import Image from "next/image"
import { useState } from "react"
import PageLayout from "../components/PageLayout"

const products = [
    {
        category: "Pre-Workout",
        description: "Energy and focus for intense training sessions",
        icon: "⚡",
        items: [
            { src: "/preworkout-1.png", name: "BuckedUp Pre-workout"},
            { src: "/preworkout-2.png", name: "WOKE AF"},
            { src: "/preworkout-3.png", name: "LFG Pre-workout"},
            { src: "/preworkout-4.png", name: "Mother Bucker" },
        ],
    },
    {
        category: "Creatine",
        description: "Build strength and power with every rep",
        icon: "💪🏾",
        items: [
            { src: "/buckbuild.png", name: "Buck Build" },
            { src: "/creatine-gummies.png", name: "Creatine Gummies" },
            { src: "/6point-creatine.png", name: "6 Point Creatine" },
            { src: "/creatine-mono.png", name: "Creatine Monohydrate"},
        ]
    },
    {
        category: "Testosterone",
        description: "Support natural Testosterone and performance",
        icon: "🔥",
        items: [
            { src: "/test-booster.png", name: "Test Booster" },
        ]
    },
    {
        category: "BCAA",
        description: "Recover faster and reduce muscle soreness",
        icon: "🧪",
        items: [
            { src: "/bcaa.png", name: "BCAA" },
        ],
    },
]

export default function SupplementsPage() {

    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText("UNCLJHN30")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <PageLayout>
            <div className="px-4 sm:px-6 py-8 max-w-4x1 page-enter">

                {/*Header with logo */}
                <div className="flex items-center gap-4 mb-2">
                    <Image
                        src="/buckedup_logo3.png"
                        alt="BuckedUp"
                        width={40}
                        height={40}
                        className="object-contain"
                    />
                    <h1 className="text-2x1 font-medium" style={{ color: "var(--accent)" }}>
                        BuckedUp Supplements
                    </h1>
                </div>

                <p className="text-sm mb-8 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    I&apos;m an official BuckedUp ambassador. Get premium pre-workout, protien, and 
                    more - use my promo code for a discount on every order!
                </p>

                {/* Promo Code Card */}
                <div
                    className="rounded-x1 p-8 text-center mb-10 relation overflow-hidden"
                    style={{ background: "var(--bg-sidebar)" }}
                >
                    <div
                        className="absoulte inset-0"
                        style={{
                            background: "linear-gradient(135deg, rgba(229,48,32,0.15) 0% rgba(212,150,10,0.1) 100%",
                        }}
                    />

                    <div className="relative">
                        <div className="flex justify-center mb-4">
                            <Image
                                src="/buckedup_logo2.png"
                                alt="BuckedUp"
                                width={140}
                                height={40}
                                className="object-contain"
                            />
                        </div>

                        <p
                            className="text-xs uppercase tracking-widest mb-3"
                            style={{ color: "var(--sidebar-muted)" }}
                        >
                            Your promo code
                        </p>

                        <p
                            className="text-3x1 sm:text-4x1 font-medium tracking-widest mb-4"
                            style={{ color: "var(--gold-bright)", fontFamily: "monospace" }}
                        >
                            UNCLJHN30
                        </p>

                        <button
                            onClick={handleCopy}
                            className="text-xs px-5 py-2 rounded-lg btn-animate mb-4"
                            style={{ background: "rgba(252,217,168,0.15)", color: "var(--sidebar-text)" }}
                        >
                            {copied ? "Copied! ✓" : "Copy code"}
                        </button>

                        <p className="text-xs" style={{ color: "var(--sidebar-muted)" }}>
                            <span style={{ color: "var(--green)" }}>✓</span> Auto-applies when you shop through my link
                        </p>
                    </div>
                </div>

                {/* Product Categories */}
                {products.map((category) => (
                    <section key={category.category} className="mb-8">

                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-lg">{category.icon}</span>
                            <div>
                                <h2 className="text-base font-medium" style={{ color: "var(--text-main)" }}>
                                    {category.category}
                                </h2>
                                <p className="text.xs" style={{ color: "var(--text-muted)" }}>
                                    {category.description}
                                </p>
                            </div>
                        </div>

                        <div className="grip grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                            
                            {category.items.map((item) => (
                           <a 
                                key={item.name}
                                href="http://bckd.com/qBzeSW1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-x1 p-4 flex flex-col items-center gap-3 hover-lift cursor-pointer"
                                style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
                            >
                                <div className="w-24 h-24 flex items-center jusitfy-center">
                                    <Image  
                                        src={item.src}
                                        alt={item.name}
                                        width={80}
                                        height={80}
                                        className="object-contain"
                                    />
                                </div>
                                <p className="text-xs font-medium text-center" style={{ color: "var(--text-main)" }}>
                                    {item.name}
                                </p>
                            </a>
                            ))}
                        </div>


                    </section>
                ))}

                {/* Bottom CTA */}
                <div 
                    className="rounded-x1 p-6 text-center mt-4"
                    style={{ background: "var(--bg-surface)", border: "0.5px solid var(--border)" }}
                >
                    <div className="flex justify-center mb-3">
                        <Image
                            src="/buckedup_logo4.png"
                            alt="BuckedUp"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                    </div>

                    <div
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-lg mb-4"
                        style={{
                            background: "rgba(255,200,64,0.1)",
                            border: "1px dashed var(--gold)",
                        }}
                    >
                        <span 
                            className="text-xs font medium tracking-widest"
                            style={{ color: "var(--gold)", fontFamily: "monospace" }}
                        >
                            UNCLJHN30
                        </span>
                        <button
                            onClick={handleCopy}
                            className="text-xs px-2 py-1 rounded"
                            style={{ background: "var(--gold-bg)", color: "var(--gold-text)" }}
                        >
                            {copied ? "✓" : "Copy"}
                        </button>
                    </div>

                    <br />

                    <a
                        href="http://bckd.com/qBzeSW1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sm font-medium px-7 py-3 rounded-lg btn-animate"
                        style={{ background: "var(--accent", color: "#fff" }}
                    >
                        Shop BuckedUp - UNCLJHN30 ↗
                    </a>
                </div>

                
            </div>
        </PageLayout>
    )
}