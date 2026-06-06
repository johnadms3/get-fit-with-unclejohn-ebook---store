import Image from "next/image"
import PageLayout from "../components/PageLayout"
import Link from "next/link"

export default function BooksPage() {
    return (
        <PageLayout>
            <div className="px-4 sm:px-6 py-8 max-w-4x1">

                <h1 className="text-2x1 font-medium mb-2">Books</h1>
                <p className="text-sm text-gray-500 mb-8">
                    Browse the full collection from Uncle John.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:graid-cols-3 gap-4">
                    <div className="bg-white border border-gray-200 rounded-x1 overflow-hidden">
                        <div className="flex justify-center p-6 bg-gray-50">
                        <Image
                            src="/GetRightWithUncleJohn.jpeg"
                            alt="Get Fit With Uncle John"
                            width={120}
                            height={160}
                            className="rounded-lg border border-gray-200"
                            />
                        </div>
                    <div className="p-4">
                        <h2 className="text-sm font-medium mb-1">Get Right With Uncle John</h2>
                        <p className="text-xs text-gray-500 mb-3">
                            A complete fitness plan for multiple training levels. With exercise videos and everything you need to get started.
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-base font-medium">$24.99</span>
                            <Link
                                href="/"
                                className="text-xs bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
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