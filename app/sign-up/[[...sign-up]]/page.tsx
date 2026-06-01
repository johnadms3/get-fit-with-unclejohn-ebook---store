import { SignUp } from "@clerk/nextjs"
import Sidebar from "../../components/Sidebar"

export default function SignUpPage() {
    return(
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 flex items-center justify-center py-12">
                <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
            </main>
        </div>
    )
}