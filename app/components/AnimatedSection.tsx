"use client"

export default function AnimatedSection({
    children,
    delay = 0,
}: {
    children: React.ReactNode
    delay?: number
}) {
    return (
        <div
            className="fade-in"
            style={{ transitionDelay: `${delay}ms` }}
            >
                {children}
            </div>
    )
}