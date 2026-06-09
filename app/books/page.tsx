import Image from "next/image"
import PageLayout from "../components/PageLayout"
import Link from "next/link"

export default function BooksPage() {
    return (
        <PageLayout>
            <div className="px-4 sm:px-6 py-8 max-w-4x1">

                <h1 className="text-2x1 font-medium mb-2" style={{ color: "var(--text-main)" }}>Books</h1>
                <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                    Browse the full collection from Uncle John.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:graid-cols-3 gap-4">

                    <div className="rounded-x1 overflow-hidden" style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}>
                        <div className="flex justify-center p-6" style={{ background: "var(--bg-surface)" }}>
                        <Image
                            src="/GetRightWithUncleJohn.jpeg"
                            alt="Get Fit With Uncle John"
                            width={120}
                            height={160}
                            className="rounded-lg"
                            style={{ border: "0.5px solid var(--border)" }}
                            />
                        </div>
                    <div className="p-4">
                        <h2 className="text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>Get Right With Uncle John</h2>
                        <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>
                            A complete fitness plan for multiple training levels. With exercise videos and everything you need to get started.
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-base font-medium" style={{ color: "var(--gold)" }}>$24.99</span>
                            <Link
                                href="/"
                                className="text-xs px-4 py-2 rounded-lg transition-colors"
                                style={{ background: "var(--accent)", color: "#fff" }}
                                >
                                    View book
                                </Link>
                        </div>
                    </div>
                </div>
            </div>

            </div>
        </PageLayout>
    )
}