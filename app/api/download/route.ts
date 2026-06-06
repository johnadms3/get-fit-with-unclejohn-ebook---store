import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import path from "path"

export async function GET() {
    try {
        // Check if the user is logged in
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json(
                { error: "You must be signed in to download" },
                { status: 401 }
            )
        }
        
        // Find the ebook file in the private folder
        const filePath = path.join(process.cwd(), "private", "GetFitWithUncleJohn.epub")
        const fileBuffer = readFileSync(filePath)

        // Send the file to the user
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": "application/epub",
                "Content-Disposition": "attachment; filename=GetFitWithUncleJohn.epub",
            },
        })

    } catch (error) {
        console.error("Download error:", error)
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        )
    }
}
