import Image from "next/image"
import PageLayout from "../components/PageLayout"
import Link from "next/link"
import { getAllBooks } from "../data/books"


export default function BooksPage() {
    const books = getAllBooks()


    return (
        <PageLayout>
            <div className="px-4 sm:px-6 py-8 max-w-4x1 page-enter">

                <h1 className="text-2x1 font-medium mb-2" style={{ color: "var(--text-main)" }}>Books</h1>
                <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                    Browse the full collection from Uncle John.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:graid-cols-3 gap-4">
                    {books.map((book) => (
                    <div 
                        key={book.id}
                        className="rounded-x1 overflow-hidden hover-glow hover-scale" 
                        style={{ background: "var(--accent)", border: "0.5px solid var(--border)" }}
                    >

                    <div className="flex justify-center p-6" style={{ background: "rgba(0,0,0,0.15)" }}>
                        <Image
                            src={book.cover}
                            alt={book.title}
                            width={120}
                            height={160}
                            className="rounded-lg"
                            style={{ border: "0.5px solid rgba(255,255,255,0.2)" }}
                            />
                        </div>
                    <div className="p-4">
                        <h2 className="text-sm font-medium mb-1" style={{ color: "var(--text-main)" }}>{book.title}</h2>
                        <p className="text-xs mb-3" style={{ color: "var)--text-muted)" }}>
                            {book.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-base font-medium" style={{ color: "var(--gold)" }}>${book.price}</span>
                            <Link
                                href={`/book/${book.id}`}
                                className="text-xs px-4 py-2 rounded-lg transition-colors"
                                style={{ background: "var(--accent)", color: "#fff" }}
                                >
                                    View book
                                </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </PageLayout>
    )
}