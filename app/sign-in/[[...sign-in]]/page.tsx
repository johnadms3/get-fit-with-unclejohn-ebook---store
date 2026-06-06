import { SignIn } from "@clerk/nextjs"
import PageLayout from "../../components/PageLayout"

export default function SignInPage() {
    return(
        <PageLayout>
            <div className="flex-1 flex items-center justify-center py-12">
                <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
            </div>
        </PageLayout>
    )
}