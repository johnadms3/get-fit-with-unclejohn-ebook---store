import Link from "next/link"
import Sidebar from "../components/Sidebar"


export default function SuccessPage() {
    return(
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center">
                
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
                    <button className="bg-black text-white text-sm px-6 py-3 rounded-lg hover:bg-gray-800 transistion-colors">
                        Download your book
                    </button>
                    <Link
                    href="/"
                    className="text-sm px-6 py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                        Back to store
                    </Link>
                </div>

            </main>
        </div>
    )
}