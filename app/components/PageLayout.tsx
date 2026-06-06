import Sidebar from "./Sidebar"
import MobileHeader from "./MobileHeader"

export default function PageLayout ({ children }: { children: React.ReactNode }) {
    return (
        <>
        <MobileHeader />
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">
                {children}
            </main>
        </div>
        </>
    )
}