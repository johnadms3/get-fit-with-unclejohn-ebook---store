"use client"

import { useEffect, useRef, useState } from "react"

export default function AnimatedSection({
    children,
    delay = 0,
}: {
    children: React.ReactNode
    delay?: number
}) {

    const ref = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return 

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => setIsVisible(true), delay)
                        observer.unobserve(el)
                    }
                })
            },
            { threshold: 0.05 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [delay])


    return (
        <div
            ref={ref}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
        >
            {children}
        </div>
    )
}