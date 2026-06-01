import { SignIn } from "@clerk/nextjs"
import Sidebar from "../../components/Sidebar"

export default function SignInPage() {
    return(
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 flex items-center justify-center py-12">
                <SignIn />
            </main>
        </div>
    )
}