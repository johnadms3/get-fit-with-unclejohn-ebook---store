"use client"

import { useEffect, useRef } from "react"

export default function AnimatedSection({
    children,
    delay = 0,
}: {
    children: React.ReactNode
    delay?: number
}) {

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return 

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            el.classList.add("visible")
                        }, delay)
                        observer.unobserve(el)
                    }
                })
            },
            { threshold: 0.1 }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [delay])


    return (
        <div
            ref={ref}
            className="fade-in"
            >
                {children}
            </div>
    )
}