import { SignUp } from "@clerk/nextjs"
import PageLayout from "../../components/PageLayout"

export default function SignUpPage() {
    return(
            <PageLayout>
            <div className="flex-1 flex items-center justify-center py-12">
                <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
            </div>
        </PageLayout>
    )
}