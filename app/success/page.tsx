"use client"

import Link from "next/link"
import PageLayout from "../components/PageLayout"


export default function SuccessPage() {

    const handleDownload = async () => {
        const response = await fetch("/api/download")
        if(response.ok) {
            // Turn the response into a downloadable file
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = "GetRightWithUncleJohn.epub"
            link.click()
            window.URL.revokeObjectURL(url)
        } else {
            alert("There was a problem downloading your book. Please try again.")
        }
    }

    return(
            <PageLayout>
            <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center min-h-[80vh]">
                
                <div className="text-5x1 mb-6">💪🏾</div>

                <h1 className="text-2x1 font-medium mb-3">
                    You&apos;re all set!
                </h1>

                <p className="text-sm text-gray-500 mb-2 max-w-sm leading-relaxed">
                    Thanks for your purchase! Your copy of <strong>Get Fit With Uncle John</strong> is ready.
                </p>

                <p className="text-xs text-gray-400 mb-8">
                    A receipt has been sent to your email by Stripe.
                </p>

                <div className="flex gap-3 flex-wrap justify-center">
                    <button 
                    onClick={handleDownload}
                    className="bg-black text-white text-sm px-6 py-3 rounded-lg hover:bg-gray-800 transistion-colors">
                        Download your book
                    </button>
                    <Link
                    href="/"
                    className="text-sm px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        Back to store
                    </Link>
                </div>

            </div>
        </PageLayout>
    )
}