"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import PageLayout from "../../components/PageLayout"
import { getBookById } from "../../data/books"
import { useCart } from "../../context/CartContext"
import Link from "next/link"

export default function BookDetailPage() {
    const params = useParams()
    const router = useRouter()
    const { addToCart } = useCart()
    const book = getBookById(params.id as string)

    if(!book) {
        return (
            <PageLayout>
                <div className="flex-1 flex items-center justify-center py-20">
                    <div className="text-center">
                        <p className="text-lg font-medium mb-2" style={{ color: "var(--text-main) "}}>Book not Found</p>
                        <Link href="/books" className="text-sm" style={{ color: "var(--accent)" }}>Back to books</Link>
                    </div>
                </div>
            </PageLayout>
        )
    }

    const handleBuyNow = () => {
        addToCart({ id: book.id, title: book.title, price: book.price, quantity: 1 })
        router.push("/cart")
    }

    return (
        <PageLayout>
            <div className="px-4 sm:px-6 py-8 max-w-3x1 page-enter">

                <div className="flex flex-col sm:flex-row gap-8 mb-10">
                    <div className="flex justify-center">
                        <Image
                            src={book.cover}
                            alt={book.title}
                            width={180}
                            height={240}
                            className="rounded-lg"
                            style={{ border: "0.5 solid var(--border)" }}
                        />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2x1 font-medium mb-2" style={{ color: "var(--accent)" }}>
                            {book.title}
                        </h1>
                        <p className="text-sm mb-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
                            {book.description}
                        </p>

                        <div className="flex gap-2 flex-wrap mb-4">
                            {book.badges.map((badge) => (
                                <span
                                    key={badge}
                                    className="text-xs px-3 py-1 rounded-lg font-medium"
                                    style={{ background: "var(--gold-bg)", color: "var(--gold-text)" }}
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                        <p className="text-2x1 font-medium mb-4" style={{ color: "var(--gold)" }}>
                            ${book.price}
                        </p>

                        <div className="flex gap-3 flex-wrap">
                            <button
                                onClick={handleBuyNow}
                                className="text-sm font medium px-7 py-3 rounded-lg btn-animate"
                                style={{ background: "var(--accent)", color: "#fff" }}
                                >
                                    Buy Now
                            </button>
                            <button
                                onClick={() => addToCart({ id: book.id, title: book.title, price: book.price, quantity: 1 })}
                                className="text-sm px-5 py-3 rounded-lg btn-animate"
                                style={{ color: "var(--gold)", border: "0.5px solid var(--gold)" }}
                                >
                                    Add to Cart
                                </button>
                        </div>
                    </div>
                </div>

                <section className="mb-10">
                    <h2 className="text-base font-medium mb-4" style={{ color: "var(--text-main)" }}>
                        What&apos;s inside
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {book.chapters.map((chapter) => (
                            <div
                                key={chapter.title}
                                className="rounded-x1 p-4 hover-lift"
                                style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
                            >
                                <p className="text-sm font-medium flex items-center gap-2" style={{ color: "var(--text-main)" }}>
                                    {chapter.dot === "red" && (
                                        <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--accent)" }}/>
                                    )}
                                    {chapter.dot === "black" && (
                                        <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--text-main)" }}/>
                                    )}
                                    {chapter.dot === "green" && (
                                        <span className="w-2 h-2 rounded-full inline-block" style={{ background: "var(--green)" }}/>
                                    )}
                                    {chapter.title}
                                </p>
                                {chapter.subtitles && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {chapter.subtitles.map((sub) => (
                                            <span
                                                key={sub}
                                                className="text-xs px-2 py-1 rounded-lg"
                                                style={{ background: "var(--gold-bg", color: "var(--gold-text)" }}
                                            >
                                                {sub}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </PageLayout>
    )
}